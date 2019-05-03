var heardHtml =['        <header class="header fixed-top"> ',
'                        <div class="header-box"> ',
'                        <div class="logo"><a href="../index.html"><img src="../img/logo.jpg" alt=""></a></div> ',
'                        <ul class="nav-list"> ',
'                        <div class="nav-item"><a class="as" href="../index.html#section-two">走进锡林</a></div> ',
'                        <div class="nav-item"><a class="as" href="../index.html#section-three">科技创新</a></div> ',
'                        <div class="nav-item" id="recommend-nav"> <a class="as" href="../news.html">公司新闻</a> </div> ',
'                        <div class="nav-item" id="advantage-nav"> ',
'                                <a class="as" href="../industrialtourism.html">工业旅游</a> ',
'                                <div class="mask"></div> ',
'                                <div class="sub-nav"> ',
'                                        <ul class="sub-nav-list"> ',
'                                               <li><a href="../industrialtourism.html#section-two">游览专线</a></li> ',
'                                                <li><a href="../booktavern.html">酒店预订</a></li> ',
'                                                <li><a href="../meeting.html">会议服务</a></li>  ',
'                                        </ul> ',
'                                </div> ',
'                        </div> ',
'                        <div class="nav-item"><a class="as" href="../social.html">社会责任</a></div> ',
'                        <div class="nav-item"><a class="as" href="../PartyMemberNews.html">党群建设</a></div> ',
'                        <div class="nav-item"><a class="as" href="../communion.html">内部交流</a></div> ',
'                       </ul>       ',
'                </div> ',
'        </header>'].join("");

var footerHtml = ['          <div class="section footer fp-auto-height" >',
'                <hgroup class="foo">',
'                        <h5>Copyright © www.AxureUX.com, All Rights Reserved</h5>',
'                         <h5>京能（锡林郭勒）发电有限公司  Email:xilinpower@.com  tel:0479-6978000</h5>',
'                </hgroup>',
'            </div>'].join("");
$("body").append(heardHtml);
$("body").append(footerHtml);


var x = document.getElementById("media"); 

$(function(){ 
    $("#audio_btn").click(function(){
        $(this).toggleClass("rotate");        
        if($(this).hasClass("rotate")){
            x.play();
        }else{
            x.pause();
        }
    })
});