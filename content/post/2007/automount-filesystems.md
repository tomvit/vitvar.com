---
title: "Auto Mount a Network File System in Ubuntu based on a Specific Network"
date: 2007-10-20T19:00:00+01:00
description: ""
slug: "automount-filesystems"
draft: false
---

When you use different network file systems on different networks (e.g., you often move your laptop from work to home) you may want to mount them automatically depending on the network you are connected to. You can do this with a script I introduce in this post.

I often take my laptop from work to home and thus change the networks. At work there are network file systems which I use to backup my data and share files with others. These are only accessible from my work’s private network. When I am at home, I need to mount my home network file system — the source for my video and music. The other situation might be that you want to mount file systems at certain network where you have a fast access to those file systems (e.g., file system in your linux server at work over ssh). To do this automatically depending on the network you are connected, just follow the steps below. This idea and the script are based on the [idea and the script for auto mounting SSH file systems](https://ubuntuforums.org/showthread.php?t=430312).

### Howto
This howto works for Ubuntu Fiesty. Feel free to adjust it to your own distribution and environment.

First, you need to specify valid networks for your `fstab` entries. For this the script uses the comment attribute of `fstab` entry options where in single quotas you list the network addresses that the file system should be mounted at. The individual network addresses are separated with commas as shown in the example below.

```bash
//srvname /mnt/somedir cifs comment='192.168.16.0,10.2.16.0', username=usr,password=pswd,domain=IE,noauto 0 0
```

You also should specify `noauto` attribute to prevent the file system from being mounted automatically by your system. The script will take care of it instead. Also, since network file systems are usually only accessible with proper username/password you should also specify those.

Then, download the scripts `mount-networks` and `umount-networks` to `/etc/network/if-up.d and /etc/network/if-down.d` folder and set executable rights for them. You can do it by using following commands:

```bash
sudo wget http://www.vitvar.com/misc/mount-networks --directory-prefix=/etc/network/if-up.d/
sudo wget http://www.vitvar.com/misc/umount-networks --directory-prefix=/etc/network/if-down.d/
sudo chmod 601 /etc/network/if-up.d/mount-networks sudo chmod 601 /etc/network/if-down.d/umount-networks
```

That’s it. You can now switch your networks and your file systems will be mounted as you have them defined in your fstab.

### How it works

The script `mount-networks` is executed whenever the network is on. It searches for all `fstab` entries with comment attribute. For each entry, it parses the comment and gets all the networks. Then, it gets IP addresses and masks for all interfaces using the ifconfig shell command. For each IP address and using the mask, the script tests if the IP belongs to at least one of the networks from the `fstab` entry. If yes, the script mounts the file system.

The script `umount-networks` is executed whenever the network gets down. The script just unmounts all file systems from the fstab with the comment attribute present with list of networks.

**Update from Oscar on May 18, 2010**

I had to change one line in the `mount-networks` script. After that it works like a charm. Excellent post! Thanks!

Maybe my change will help others too. I changed line 85 in `mount-networks` as follows:

```bash
- for num in `echo “$2.” | egrep -o “^[0-9]*\.” | sed “s/\.//”`; do
+ for num in `echo “$2″ | sed “s/\./ /g”`; do```
```
