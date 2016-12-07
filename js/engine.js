$(document).ready(function(){
    //Object data
    var flags;
    var rates , sell , buy , selling_rates, buying_rates ;
    var sell_currency_side,buy_currency_side;
    $.getJSON("json_files/flags.json",function(flagsData){
        flags = flagsData;
        
        $.getJSON("json_files/rates.json", function(ratesData){
            rates = ratesData;
            //console.log(rates);
             
            
            sell = "USD";//sell_currency_side;
            buy =  "TZS";//buy_currency_side;
            
            currency_default_load(sell,buy);
            popular_rates()
            
        });
        //console.log(flags);
        //var v = "BR"
        //country_flag(v);
        //countries_flag()
        currencySell_list();
        currencyBuy_list();
        //currency_tag()
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
    
    function currencySell_list(){
        var drop_list = "";
        drop_list += "<ul id=\'dropdown_current\' class=\'dropdown-menu\'>"
            $.each(flags, function(i, value){
            
            drop_list +="<li data-currency-tag=\'"+value.currency_tag+"\' data-flag-name=\'"+value.flag_name+"\' data-currency-name=\'"+value.currency_name+"\'>"+"<i class=\'flag flag-"+value.flag_name+"\'></i>"+"<span class=\'flag_name\'>"+value.currency_name+"</span>"+"</li>";
            
        })+ "</ul>";
        
        $("#currencyHave").append(drop_list);
    };
    //currencyChange_list()
    
    function currencyBuy_list(){
        //var countryFlag = country_flag(flag_name)
        //var currencyName = "Tanzania shilingi";
        var drop_list = "";
        drop_list += "<ul id=\'dropdown_change\' class=\'dropdown-menu\'>"
            $.each(flags, function(i, value){
            
            drop_list += "<li data-currency-tag=\'"+value.currency_tag+"\' data-flag-name=\'"+value.flag_name+"\' data-currency-name=\'"+value.currency_name+"\'>"+"<i class=\'flag flag-"+value.flag_name+"\'></i>"+"<span class=\'flag_name\'>"+value.currency_name+"</span>"+"</li>";
            //console.log(i+" " +value.flag_name+" "+ value.currency_name)
        }) + "</ul>";
        
        $("#currencyChange").append(drop_list);
    };
    
    //$("#currencyChange").delegate("#")
    
    $("#base_currncInpt").on("focus", function(){
       //console.log("yap")
       $("#dropdown_current").css("display","block")
    });  
    
    is_current_opened = false;
    $("#base_currncInpt").on("blur", function(){
       //console.log("yap")
       is_current_opened = true;
       //if(".dropdown-menu")
       //$("#country_left:.dropdown-menu").le
    });
    
    $("body:not(#dropdown_current)").on("click",function(){
        //console.log("outside");
        if(is_current_opened){
            is_current_opened = false;
        $("#dropdown_current").hide();
            
        }else{
            
        }
    });
    
    //Loading default input value for sell currency
    $("#base_currncInpt").val("United States Dollar");
    //Loading default input value for buy currency
    $("#base_changing").val("Tanzanian Shilling");
    //loading sell currency amount
    $("#sell_currency").val(1);
    
    //currency_default_load(f)
    function currency_default_load(sell_currency,buy_currency){
        console.log(sell_currency)
        console.log(buy_currency)
        $("#base_currncInpt").on("focus", function(){
       //console.log("yap")
        $(this).val("")
        }); 
        $("#base_changing").on("focus", function(){
       //console.log("yap")
        $(this).val("")
        }); 
        $('#sell_currency').on("focus",function(){
            $(this).val("")
        })
        get_baseRates(sell_currency);
        console.log(selling_rates);
        var default_price =  $('#sell_currency').val()
        $.each(selling_rates,function(i,selling_rate){
            if(i == buy_currency){
                console.log(selling_rate);
                var buying_rate = default_price * selling_rate;
                console.log(buying_rate)
                var buying_round = (buying_rate).toFixed(2);
                //var w = Math.round(buying_rate)
                $("#buying_currency").val(buying_round);
                $('#buying_currency').val(function(index,value){
                    return value
                       // .replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                })
            };
        });
    };
    
    $('#currencyHave').delegate("#dropdown_current li","click", function(){
        var sell_currencyName = $(this).attr("data-currency-name");
         var sell_flagName = $(this).attr("data-flag-name");
        var selling_currency_tag = $(this).attr("data-currency-tag");
        console.log(selling_currency_tag);
        //currency_tag(c);
        
        sell = selling_currency_tag;
        //change country name
        $("#base_currncInpt").val(sell_currencyName);
        //change flag image
        $(".flag-sell i").attr("class","flag flag-"+sell_flagName);
        //console.log(d)
    });
    
    $("#currencyChange").delegate("#dropdown_change li", "click", function(){
        var buy_currencyName = $(this).attr("data-currency-name");
        var buy_flagName = $(this).attr("data-flag-name");
        var buying_currency_tag = $(this).attr("data-currency-tag");
       
        buy = buying_currency_tag;
        //change country name
        $("#base_changing").val(buy_currencyName);
        //change flag name
        $(".flag-buy i").attr("class","flag flag-"+buy_flagName);
    });
    
    $('#sell_currency').on("keyup",function(){
        var currency_left_sell = $(this).val();
        //format number
//        $(this).val(function(index,value){
//            return value
//            .replace(/\D/g, "")
//            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//        });
        console.log(currency_left_sell);
        console.log(sell);
        //console.log(buy);
        selling_currency_rates(sell,currency_left_sell)
    });
    
    function selling_currency_rates(sell_rate_data,buying_rate_data){
        get_baseRates(sell_rate_data);
        console.log(selling_rates)
        $.each(selling_rates,function(i,selling_rate){
            if(i == buy){
                console.log(selling_rate);
                var buying_rate = buying_rate_data * selling_rate;
                console.log(buying_rate)
                var buying_round = (buying_rate).toFixed(2);
                //var w = Math.round(buying_rate)
                $("#buying_currency").val(buying_round);
                $("#buying_currency").val(function(index,value){
                    return value
                       // .replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                })
            };
        });
    }
    
    $("#calculate_rate_btn").on("click",function(e){
        e.preventDefault();
        var currency_left_sell = $("#sell_currency").val();
        //format number
//        $("#sell_currency").val(function(index,value){
//            return value
//            .replace(/\D/g, "")
//            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//        });
        console.log(currency_left_sell);
        console.log(sell);
        //console.log(buy);
        get_baseRates(sell);
        console.log(selling_rates)
        $.each(selling_rates,function(i,selling_rate){
            if(i == buy){
                console.log(selling_rate);
                var buying_rate = currency_left_sell * selling_rate;
                console.log(buying_rate)
                $("#buying_currency").val(buying_rate);
            };
        });
    });
    
    $("#swap_currency_btn").on("click",function(e){
        e.preventDefault();
        var sell_currency = $("#base_currncInpt").val();
        $("#base_currncInpt").val($("#base_changing").val());
        $("#base_changing").val(sell_currency);
        var sell_flag = $(".flag-sell i").attr("class");
        var buy_flag = $(".flag-buy i").attr("class")
        var change_sell_flag = $(".flag-buy i").attr("class",sell_flag);
        var change_buy_flag = $(".flag-sell i").attr("class",buy_flag);
        //selling_currency_rates(buy,$("#sell_currency").val())
    });
    
$("#leftSide_rates").delegate("#popular_rate_table tr","click",function(e){
    var id_base = $(e.currentTarget).attr("data-base-id");
    var id_index = $(e.currentTarget).attr("data-id");
    sell = id_base;
    buy = id_index;
    
    //change flags
    //change value of inputs
    //change base
    //change global variables

    //load default with new base
        //currency_default_load(sell,buy);

//    console.log(sell_currency_side);
//    console.log(buy_currency_side);
    getPopular_rate(sell,buy)
    
    console.log("clicked")
});
    function getPopular_rate(sell_currency_code,buy_currency_code){
        var selling_currency_code;
        var buying_currency_code;
        $.each(rates,function(index,rate){
            //console.log(rate.base)
            if(sell_currency_code == rate.base){
                selling_currency_code = sell_currency_code;
                
                //console.log(sell_currency_code);
                $.each(flags,function(index,flag){
                    if(selling_currency_code == flag.currency_tag){
                        console.log(flag.flag_name)
                        console.log(flag.currency_name)
                        //change country name
                        $("#base_currncInpt").val(flag.currency_name);
                        //change flag image
                        $(".flag-sell i").attr("class","flag flag-"+flag.flag_name);
                        //console.log(d)
                        $("#country_name_tab").html(flag.country_name);
                        $("#currency_name_tab").html(flag.currency_name);
                    }
                })
                
            }else if(buy_currency_code == rate.base){
                buying_currency_code = buy_currency_code;
                //console.log(buying_currency_code)
                $.each(flags,function(index,flag){
                    if(buying_currency_code == flag.currency_tag){
                        console.log(flag.flag_name)
                        console.log(flag.currency_name)
                        //console.log("iko")
                        $("#base_changing").val(flag.currency_name);
                        //change flag name
                        $(".flag-buy i").attr("class","flag flag-"+flag.flag_name);
                    }
                })
            };
        });
         currency_default_load(selling_currency_code,buying_currency_code);
    }

    //get popular rates
    function popular_rates(){
        //var rate_data = rates[Math.floor(Math.random() * rates.length)];
        //console.log(rate_data)
        var count_id = 0
        $.each(rates,function(index,rate){
            console.log(rate);
            console.log(rate.base);
            
            
            var base = rate.base
            var base_rates = rate.rates
            $.each(base_rates,function(index,base_rate){
                console.log(base+"/"+index+" "+base_rate);
                var popular_div = "";
                count_id = count_id+1
                popular_div +="<tr id="+base+count_id+" data-base-id="+base+" data-id="+index+" >"+
                                "<td>"+base+"/"+index+"</td>"+
                                "<td class=\'separa_line\'>"+base_rate+"</td>"+
                                "<td>+0,0009%</td>"+
                                "</tr>";
                $("#leftSide_rates #popular_rate_table").append(popular_div);
            });
        });
    };
    
    //get base rate
    function get_baseRates(flag_tag){
        $.each(rates,function(i,rate){
            //console.log(flag.currency_tag);
            if(flag_tag == rate.base){
                //return false;
                //console.log(rate.rates);
                selling_rates =  rate.rates;
            };
           //return currency_rate;
        });
    };
    
    $("#base_changing").on("focus", function(){
       //console.log("yap")
       $("#dropdown_change").css("display","block")
    });
    
    is_change_opened = false;
    $("#base_changing").on("blur", function(){
       //console.log("yap")
       is_change_opened = true;
       //if(".dropdown-menu")
       //$("#country_left:.dropdown-menu").le
    });
    
    $("body:not(#dropdown_change)").on("click",function(){
        //console.log("outside");
        if(is_change_opened){
            is_change_opened = false;
        $("#dropdown_change").hide();
            
        }else{
            
        }
    });
    
})