$(document).ready(function(){
    //Object data
    var flags;
    $.getJSON("json_files/flags.json",function(flagsData){
        flags = flagsData;
        //console.log(flags);
        var v = "BR"
        //country_flag(v);
        //countries_flag()
        currencyHave_list();
        currencyChange_list();
    });
    
    function country_flag(flag_name){
        $.each(flags, function(i,flag){
            //console.log(flag.currency_name);
            if(flag.flag_name == flag_name){
                console.log(flag.flag_name);
                //return flag.flag_name;
            };
        });
    };
    
    function countries_flag(){
        $.each(flags, function(i,flag){
            country_flag(flag.flag_name);
        });
    };
    
    function currencyHave_list(){
        var drop_list = "";
        drop_list += "<ul id=\'dropdown_current\' class=\'dropdown-menu\'>"
            $.each(flags, function(i, value){
            
            drop_list +="<li>"+"<i class=\'flag flag-"+value.flag_name+"\'></i>"+"<span class=\'flag_name\'>"+value.currency_name+"</span>"+"</li>";
            
        })+ "</ul>";
        
        $("#currencyHave").append(drop_list);
    };
    //currencyChange_list()
    
    function currencyChange_list(){
        //var countryFlag = country_flag(flag_name)
        //var currencyName = "Tanzania shilingi";
        var drop_list = "";
        drop_list += "<ul id=\'dropdown_change\' class=\'dropdown-menu\'>"
            $.each(flags, function(i, value){
            
            drop_list += "<li>"+"<i class=\'flag flag-"+value.flag_name+"\'></i>"+"<span class=\'flag_name\'>"+value.currency_name+"</span>"+"</li>";
            console.log(i+" " +value.flag_name+" "+ value.currency_name)
        }) + "</ul>";
        
        $("#currencyChange").append(drop_list);
    };
    
    $("#base_currncInpt").on("focus", function(){
       //console.log("yap")
       $("#dropdown_current").css("display","block")
    });  
    
    is_current_opened = false;
    $("#base_currncInpt").on("blur", function(){
       console.log("yap")
       is_current_opened = true;
       //if(".dropdown-menu")
       //$("#country_left:.dropdown-menu").le
    });
    
    $("body:not(#dropdown_current)").on("click",function(){
        console.log("outside");
        if(is_current_opened){
            is_current_opened = false;
        $("#dropdown_current").hide();
            
        }else{
            
        }
    });
    
    
    $("#base_changing").on("focus", function(){
       //console.log("yap")
       $("#dropdown_change").css("display","block")
    });
    
    is_change_opened = false;
    $("#base_changing").on("blur", function(){
       console.log("yap")
       is_change_opened = true;
       //if(".dropdown-menu")
       //$("#country_left:.dropdown-menu").le
    });
    
    $("body:not(#dropdown_change)").on("click",function(){
        console.log("outside");
        if(is_change_opened){
            is_change_opened = false;
        $("#dropdown_change").hide();
            
        }else{
            
        }
    });
    
})