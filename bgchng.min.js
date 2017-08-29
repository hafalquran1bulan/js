var images = [ &quot;http://kinerjaaktif.com/wp-content/uploads/2015/08/ngaji.jpg&quot;, &quot;https://images.pexels.com/photos/316435/pexels-photo-316435.jpeg?w=940&amp;h=650&amp;auto=compress&amp;cs=tinysrgb&quot;, &quot;http://lesalquran.privatbandung.com/wp-content/uploads/2014/06/1-570x321.png&quot;, &quot;https://www.arrohmahputri.sch.id/wp-content/uploads/2016/12/Ar-Rohmah-Putri-News-Awas-Jebakan-Liburan-Santri-1.jpg&quot; ];
var cur_image = 0;
function changeBackground() {
cur_image++;
if ( cur_image &gt;= images.length )
cur_image = 0;
// change images
$( &#39;header&#39; ).css({
backgroundImage: &#39;url(&#39; + images[ cur_image ] + &#39;)&#39;
}).fadeIn(2000);

$( &#39;header .content&#39; ).fadeOut( 2000, function(){

$( this ).css({
backgroundImage: &#39;url(&#39; + images[ cur_image ] + &#39;)&#39;
}).fadeIn(&#39;slow&#39;);
});
}
setInterval( changeBackground, 12000 );
