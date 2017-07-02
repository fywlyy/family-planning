
$(function(){
  //菜单
	var navData = [
    {
      name: '网上登记管理',
      link: null,
      children: [
        {
          name: '网上登记受理',
          link: '#index',
          active: true
        },{
          name: '网上登记查询',
          link: '#login',
          active: false
        },{
          name: '网上登记受理查询',
          link: '#test',
          active: false
        }
      ]
    },{
      name: '生育登记管理',
      link: null,
      children: [
        {
          name: '生育登记受理',
          link: '#test',
          active: false
        },{
          name: '生育登记查询',
          link: '#test',
          active: false
        },{
          name: '生育登记受理查询',
          link: '#test',
          active: false
        }
      ]
    }    
  ];

  var linkArr = [{//初始话加载首页Tab
    link: 'index',
    name: '网上登记受理',
    active: true
  }];
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
  $navBar
    .find('.nav_item.active')
    .parent()
    .slideDown()
    .parent()
    .addClass('active');

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
    var hasSameLink = false;
    var link = $(this).data('link').slice(1);
    var name = $(this).find('.nav_title').text();
    if($(this).hasClass('active')){
      return;
    }
    $('.nav_parent').find('.nav_child').removeClass('active');
    $(this).addClass('active');

    for(var i = 0, length = linkArr.length; i < length; i++){
      linkArr[i].active = false;
      if(link == linkArr[i].link){
        linkArr[i].active = true;
        hasSameLink = true;
      }
    }
    if(hasSameLink){
      renderTab(linkArr);
      return;
    }

    linkArr.push({
      link: link,
      name: name,
      active: true
    })
    renderTab(linkArr);
  })
})

/*导航html渲染*/
function renderNav(navData){
  var html = "<ul class='nav_list'>";
  for(var i = 0, length = navData.length; i < length; i++){
    if(!navData[i].children){
      html += "<li class='nav_item nav_child"+(navData[i].active ? ' active' : '')+"' data-link='"+(navData[i].link || '')+"'><p class='nav_title'>"+navData[i].name+"</p></li>";
    }else{
      html += "<li class='nav_item nav_parent'><p class='nav_title' data-link='"+(navData[i].link || '')+"'>"+navData[i].name+
        "</p><span class='iconfont icon-jiantou-copy-copy'></span>"+
        renderNav(navData[i].children) + "</li>";
    }
  }
  html += "</ul>";
  return html;
}

/*iframe Tab列表渲染*/
function renderTab(linkArr){
  var tabHtml = '';
  var conHtml = '';
  for(var i = 0, length = linkArr.length; i < length; i++){
    tabHtml += '<li class="'+(linkArr[i].active ? 'active' : '')+'">'+
              '<a href="#'+linkArr[i].link+'" data-toggle="tab">'+
                  linkArr[i].name+
              '</a>'+
              '<span class="icon_tab" data-index="'+i+'">×</span>'+
          '</li>';

    conHtml += '<div class="tab-pane fade in'+(linkArr[i].active ? ' active' : '')+'" id="'+linkArr[i].link+'">'+
              '<iframe src="./'+linkArr[i].link+'.html" frameborder="0"></iframe>'+
          '</div>'      
  }
  $("#myTab").html(tabHtml);
  $("#myTabContent").html(conHtml);

  if(!$("#myTab").find("li.active").hasClass('active')){//默认选中第一个
    $("#myTab").find("li").first().addClass('active');
    $("#myTabContent").find(".tab-pane").first().addClass('active');

  }

  $("#myTab").find('.icon_tab').on('click',function(){
    var index = $(this).data('index');
    linkArr.splice(index,1);
    renderTab(linkArr);
    if($(this).parent().hasClass('active')){
      $('.nav_parent').first().find('.nav_child').first().click();
    }
  })
}

