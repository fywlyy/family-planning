Date.prototype.format = function(formatStr){
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    var month = this.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}

$.fn.datetimepicker.dates['zh'] = {  
                days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],  
                daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],  
                daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],  
                months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],  
                monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],  
                meridiem:    ["上午", "下午"],   
                today:       "今天"  
        };


window.Util = {
        /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:56
     * Desc: 各种日期格式化函数
     */
    dateFormat:function(dateStr){
        return dateStr ? new Date(dateStr).format('yyyy-MM-dd hh:mm:ss') : "";
    },
    dateFormatWithChinese:function(dateStr){
        return dateStr ? new Date(dateStr).format('yyyy年MM月dd日 hh:mm:ss') : "";
    },
    dateFormatByMonth:function(dateStr){
        return dateStr ? new Date(dateStr).format('yyyy-MM-dd') : "";
    },
    dateFormatByMonthWithChinese:function(dateStr){
        return dateStr ? new Date(dateStr).format('yyyy年MM月dd日') : "";
    },
    dayFormat: function(dataStr, type){
        if(!dataStr){
            return '';
        }
        if(!type){
            type = '-';
        }
        var dateSs = new Date(dataStr);
        var year = dateSs.getFullYear();
        var month = dateSs.getMonth() + 1;
        var day = dateSs.getDate();
        month> 9 ? null : (month = '0' + month);
        day > 9 ? null : (day = '0' + day);
        return year + type + month + type + day;
    },
    clone:function(obj) {
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(this.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = this.clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
}


$(function(){
    var newDate = new Date();

    $(".date_picker").each(function(i){
        var $this = $(this);
        var setOption = {
            language:  'zh',
            format: 'yyyy-mm-dd',       
            minView: "month",
            todayBtn: true,         
        }
        if($this.hasClass('startDate') || $this.hasClass('endDate')){
            setOption.endDate = new Date();
        }

        $this.datetimepicker(setOption).on('changeDate', function (ev) {  
            var startDate = Util.dateFormatByMonth(ev.date);
            var option = Util.clone(setOption);
            var dateGroup = $(this).attr('name');
            $this.datetimepicker('hide');  
            if($this.hasClass('startDate')){
                $(".endDate[name='"+dateGroup+"']").datetimepicker('setStartDate',startDate);
            }
        });     
    });

    $(".select_component .checked_text").on("click",function(e){
        e.stopPropagation();
        $(this).next(".select_list").toggle();
    });
    $(".select_component .select_list li").on("click",function(e){
        e.stopPropagation();
        var $parent = $(this).parent();
        var $parents = $parent.parent();
        var checkedVal = $(this).data('value');
        var checkedText = $(this).text();
        $parent.toggle();

        $parents.find(".checked_text").text(checkedText);
        if(checkedVal == -1){
            $parents.find('input[type="hidden"]').val('');
        }else{
            $parents.find('input[type="hidden"]').val(checkedVal);
        }
    });
    $(document).on("click",function(){
        $(".select_component .select_list").hide();
    })
})