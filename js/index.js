
$(function(){
	var defaultData = [
      {
        text: '网上登记管理',
        href: '#parent1',
        tags: ['4'],
        nodes: [
          {
            text: '网上登记受理',
            href: '#child1',
            tags: ['0']
          },
          {
            text: '网上登记查询',
            href: '#child2',
            tags: ['0']
          },
          {
            text: '网上登记受理查询',
            href: '#child2',
            tags: ['0']
          }
        ]
      },
      {
        text: '生育登记管理',
        href: '#parent2',
        tags: ['0']
      },
      {
        text: '协查管理',
        href: '#parent3',
         tags: ['0']
      },
      {
        text: '综合查询',
        href: '#parent4',
        tags: ['0']
      },
      {
        text: '统计报表',
        href: '#parent5'  ,
        tags: ['0']
      }
    ];

    $('#treeView').treeview({
    	data: defaultData
	});
})
