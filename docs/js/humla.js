// humla client
// this script serves humla-toc shortcode, see themes/curvytech/layouts/shortcodes/humla-toc
// this requires jquqery and jquery datatables

const RESOURCE_HUMLATOC = {
  columns: [
    { title: "NO.",        width: "5px",   data: "_no",   format: (value,row,type,val,meta)=>{ return meta.row+1 } },
    { title: "LECTURE",    width: "450px", data: "title", format: (value)=>formatTitle(value) },
    { title: "SLIDES",     width: "10px",  data: "slidesCount" },    
    { title: "CONTENT",    width: "10px",  data: "_content", format: (value,row,type,val,meta)=>formatContent(value,row,type,val,meta) },    
    { title: "UPDATED",    width: "20px",  data: "lastModified", format: (value)=>formatDate(value) }
  ]
}

var HumlaClient = function(id) {
}

HumlaClient.prototype.render = function(site, eid) {
  $('#' + eid).html(
    '<table id="dt-' + eid + '" class="display humla-table" style="width:100%"></table>')

  this.table(RESOURCE_HUMLATOC, site, eid)
    .on('click', (row, prop, value, tr, td, table)=>{
      // de-select any selected row button
      var shown=row.child.isShown() 
      table.collapse()
      
      // toc
      if (prop==='title' && (!shown)) {
        row.child(formatTOC(row), "child-row").show();
        td.children("span").addClass('selected')
      }
    })
}  
  
HumlaClient.prototype.table = function(resourceDef, site, elementId) {
  // pre-process the settings' custom properties
  // helper function to display data
  function def(col) {
    if (!col.data_orig)
      col.data_orig=col.data
    var d=col.data
    return (row,type,val,meta)=>{
      var fv="-"
      try {
        if (d!=null)
          fv=d.split('.').reduce((obj,prop)=>obj[prop],row)
        if (type==='display' && col.format) {
          if (!row.__fv) row.__fv={}
          if (!row.__fv[col.data_orig])
            row.__fv[col.data_orig]=col.format(fv,row,type,val,meta)
          fv=row.__fv[col.data_orig]            
        }
        if (fv==null)
          fv="-"
      } catch (e) { fv="-" }
      return fv
    }
  }
  
  var settings = {
    paging : false,
    bFilter: false, 
    bInfo: false,     
    ordering: false,
    ajax: {
      url: "https://" + site + "/toc.json", 
      dataSrc: "lectures" 
    },    
    columns: resourceDef.columns
  }
  
  for (var c in settings.columns)
    settings.columns[c].data=def(settings.columns[c])
    
  $.fn.dataTable.ext.errMode = 'none';
  var table=$('#dt-' + elementId).DataTable(settings);

  // extend table with custom functions
  table.collapse=function() {
    this.rows().eq(0).each((idx)=>{
      var r = this.row(idx);
      if (r.child.isShown())
        r.child.hide();
    });            
    $("#dt-" + elementId + " span.selected").removeClass('selected');      
  }
  
  var tableDef = {
    table: table,
    settings: settings,
    on: (event, handler)=>{
      switch (event) {
        case 'click':
          $('#dt-' + elementId + " tbody").on('click', 'tr td', (e)=>{
              var index=table.cell(e.currentTarget).index();
              if (index) {
                var td=$(e.currentTarget)
                var tr=td.closest('tr')
                var row=table.row(tr)
                var prop=RESOURCE_HUMLATOC.columns[index.column].data_orig;
                var value=table.cell(e.currentTarget).data()
                handler(row, prop, value, tr, td, table)
              }
          })
          break;
        case 'error':
          $('#' + this.uuid).on('error.dt',(e,settings,techNote,message)=>handler(e, settings,settings.jqXHR))
          break;
        default:
          throw 'Unknown event: ' + event;
      }
      return tableDef
    }
  }
  
  return tableDef
  
}

/* utility functions */

var link = function(label, url) {
  var id=uniqId();
  if (url)
    window.setTimeout(()=>{
      $("#"+id).click(()=>{ 
        window.open(url, 'humla-tab');
      })   
    },200)    
  return "<span id='" + id + "' class='" + label + "'>" + label + "</span>"
}

var pad0 = function(v) {
  return v<10 ? "0" + v : "" + v 
}

var formatTitle = function(value) {
  return value + link("toc");
}

var formatDate = function(value) {
  var date = new Date(Date.parse(value));
  return pad0(date.getDate()) + "/" +pad0(date.getMonth()) + "/" + pad0(date.getFullYear());
}

var getBaseUrl = function(url) {
  var l = document.createElement("a");
  l.href = url;
  return l.protocol + "//" + l.host;  
}

var formatContent = function(value,row,type,val,meta) {
  var l = document.createElement("a");
  l.href = meta.settings.ajax.url;
  var baseUrl = getBaseUrl(meta.settings.ajax.url);
  
  return link("pdf-2", baseUrl + "/pdf/lecture" + meta.row + "-2p.pdf") + 
    link("pdf-1", baseUrl + "/pdf/lecture" + meta.row + "-1p.pdf") + 
    link("html",  baseUrl + "/" + row["slide-url"]);
}

var formatTOC = function(row) {
  var baseUrl = getBaseUrl(row.settings().ajax.url());
  
  var formatLink = function(s) {
    return "<a href='" + baseUrl + "/" + s["slide-url"] + "' target='humla-tab'>" + s.title + "</a>";   
  }
  
  var toc=""                        
  var sections1 = row.data().sections; 
  for (var j = 0; j < sections1.length; j++) {
    toc += formatLink(sections1[j]) + (sections1[j].sections.length > 0 ? "" : (j == sections1.length - 1 ? "" : ", "));
    var sections2 = sections1[j].sections;
    if (sections2.length > 0) {
      toc += " (";
      for (var k = 0; k < sections2.length; k++) {
        toc += formatLink(sections2[k]) + (k == sections2.length - 1 ? "" : ", ");
      }
      toc += ")" + (j == sections1.length - 1 ? "" : ", ");
    }
  }
  
  // function r(sec) {
  //   return sec.title + 
  //     sec.sections && sec.sections.length > 0 ? sec.sections.reduce((section,subsection)=>r(subsection),sec.sections) : ""; 
  // }
  // var toc = r({ title: "", sections: row.data().sections});
  return "<div class='toc-text'>" + toc + "</div>";
}

var uniqId = (function(){
    var i=0;
    return function() {
        return "gen" + (i++);
    }
})();
