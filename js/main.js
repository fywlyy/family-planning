
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
          link: '#flowChart',
          active: false
        },{
          name: '网上登记受理查询',
          link: '#scanID',
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
    var $myTab = $("#myTab");
    var hasSameLink = false;
    var link = $(this).data('link').slice(1);
    var name = $(this).find('.nav_title').text();
    if($(this).hasClass('active')){
      return;
    }
    $('.nav_parent').find('.nav_child').removeClass('active');
    $(this).addClass('active');

    if($myTab.find("li[data-link='#"+link+"']").hasClass('tab-item')){
      $myTab.find("li[data-link='#"+link+"']").click();
      return;
    }

    renderTab({//新增Tab
      link: link,
      name: name,
      active: true
    });
  })


  // 点击导航的头部，显示模态菜单
  $("#barHead").on("click",function(e){
    debugger;
    e.stopPropagation();
    if($("#bomboBox").hasClass('hidden')){
      $("#bomboBox").removeClass('hidden');
      $("#modal").removeClass("hidden");
    }
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

/*iframe 新增Tab列表渲染*/
function renderTab(linkObj){
  var tabHtml = '';
  var conHtml = '';
  var $myTab =$("#myTab");
  var $myTabContent =$("#myTabContent");

  $myTab.find('li.active').removeClass('active');
  tabHtml += '<li class="tab-item active" data-link="#'+linkObj.link+'">'+
            '<a href="#'+linkObj.link+'" data-toggle="tab">'+
                linkObj.name+
            '</a>'+
            '<span class="icon_tab">×</span>'+
        '</li>';

  conHtml += '<div class="tab-pane fade in active" id="'+linkObj.link+'">'+
            '<iframe src="./'+linkObj.link+'.html" frameborder="0"></iframe>'+
        '</div>'      
  $myTab.append(tabHtml);
  $myTabContent.append(conHtml);

  $myTab.find('li').on('click',function(){
    var link = $(this).data('link');
    if($(this).hasClass('active')){
      return;
    }else{
      var $parent = $('.nav_parent').find('li[data-link="'+link+'"]').parent();

      if(!$parent.parent().hasClass('active')){
        $('.nav_parent.active').find('.nav_list').slideUp();
      }
      $('.nav_parent')
        .find('.nav_child[data-link="'+link+'"]')
        .click()
        .parent()
        .slideDown()
        .parent()
        .addClass('active');
    }
  })
  $myTab.find('.icon_tab').on('click',function(){
    $(this).parent().remove();
    if($(this).parent().hasClass('active')){
      $('.nav_parent').first().find('.nav_child').first().click();
    }
  })
}

