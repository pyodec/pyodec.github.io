var headings = []
var mobile=false;
$(function(){
    /*
     *  Initialization
     */
    $(window).on('scroll',scroll);
    
    
    // get all the header tags from the document
    var catgs = $('#ref_contents').find(":header");
   //$("<a />",{ href:'#top', class:'toplink'}).html("[top]").after(catgs);
    for (c in catgs)
    {
        if (isNaN(c)) continue; // poor-man's catch
        var tag = $(catgs[c]);
        
        var type=tag[0].localName
        if (type=="h4" || type=='h5') continue
        //$("<a/>",{href:"#top"}).html("(top)").insertAfter(tag)
        link_tag  = tag.html().replace(/ /g,"").replace(/\//g,"-").replace(/&/,'+');
        //FIXME - this tag behaves poorly when the <h> is wrapped in an <a> tag already...
        $("<a />",{id:link_tag,href:'#top',class:'toplink'}).html("<span class='fa fa-chevron-circle-up'> top</span>").insertBefore(tag)
        headings.push([type,tag,link_tag]);
     }
     scroll();
     // insert a top anchor, even though this is a native browser behavior
     $("<a />",{ id:'#top'}).before("#ref_contents");
     // if they can scroll, then they can hash, so read the hash
     $(document).scrollTop($(window.location.hash).offset());
});
     

function scroll() 
{
    var pos = $(document).scrollTop();
    // ref itself is flexible
    if ($("#ref_contents").offset().top < pos)
    {
        // then ref, which is symmetrical, should switch to fixed
        $("#ref").addClass("floater"); 
    } else {
        $("#ref").removeClass("floater")
    }
    var s = "";
    // determine current key
    var topkey = 0 // the current element we are viewing
    var top_main = 0 // the H1 tag element of what we are viewing
    for (c in headings)
    {
        ht=headings[c][1].offset().top;
        
        if (ht-30>pos)
        {
            break;
        } else {
            topkey=c;
        }
        if (headings[c][0] =="h1" ) top_main = c;

    }
    
    last_top_header=0
    for (c in headings)
    {
        h=headings[c];
        if (h[0]=="h1") last_top_header = c
        else {
            // only display sub context if we are within that main header
            if (!mobile && last_top_header != top_main) continue;  
        }
        
        b="";
        if (c==topkey || c==top_main) b="on";
        
        s+="<div class='"+h[0]+" "+b+"'><a href='#"+h[2]
            +"'>"+h[1].html()+"</a></div>";
    }
    $("#ref").html(s);
}