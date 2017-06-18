
$(function(){
	var navData = [
    {
      name: '网上登记管理',
      link: null,
      children: [
        {
          name: '网上登记受理',
          link: '#children'
        },{
          name: '网上登记查询',
          link: '#children'
        },{
          name: '网上登记受理查询',
          link: '#children'
        }
      ]
    },{
      name: '生育登记管理',
      link: null,
      children: [
        {
          name: '生育登记受理',
          link: '#children'
        },{
          name: '生育登记查询',
          link: '#children'
        },{
          name: '生育登记受理查询',
          link: '#children'
        }
      ]
    }    
  ];

  var navListHtml = renderNav(navData);
  var $navBar = $(".nav_bar");
  var screenHeight = $("body").height();

  $(window).resize(function(){
    $(".container_m").css({
      height: screenHeight - 102
    });    
  });
  $(".container_m").css({
    height: screenHeight - 102
  });

  $navBar.html(navListHtml);
  $('.nav_parent').on("click",function(e){
    if($(this).hasClass('active')){
      $(this)
        .removeClass('active')        
        .find('.nav_list')
        .slideUp();
    }else{
      $('.nav_parent.active')
        .removeClass('active')
        .find('.nav_list')
        .slideUp();

      $(this)
        .addClass('active')
        .find('.nav_list')
        .slideDown();
    }
  });
  $('.nav_child').on('click',function(e){
    e.stopPropagation();
    if($(this).hasClass('active')){
      return;
    }
    $('.nav_parent').find('.nav_child').removeClass('active');
    $(this).addClass('active');
  })

})

/*导航html渲染*/
function renderNav(navData){
  var html = "<ul class='nav_list'>";
  for(var i = 0, length = navData.length; i < length; i++){
    if(!navData[i].children){
      html += "<li class='nav_item nav_child'><p class='nav_title'>"+navData[i].name+"</p></li>";
    }else{
      html += "<li class='nav_item nav_parent'><p class='nav_title'>"+navData[i].name+
        "</p><span class='iconfont icon-jiantou-copy-copy'></span>"+
        renderNav(navData[i].children) + "</li>";
    }
  }
  html += "</ul>";
  return html;
}

