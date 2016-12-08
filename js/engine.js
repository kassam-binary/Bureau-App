$(document).ready(function () {
    //Object data for flag
    var flags;
    //Object data for rates
    var rates;
    var sell, buy, selling_rates, buying_rates;
    $.getJSON("json_files/flags.json", function (flagsData) {
        flags = flagsData;
        $.getJSON("json_files/rates.json", function (ratesData) {
            rates = ratesData;
            sell = "USD"; //sell_currency_side;
            buy = "TZS"; //buy_currency_side;
            currency_default_load(sell, buy); //loading default currency rates
            popular_rates(); //loading popular currency rates
        });
        //sell currency dropdown list
        currency_dropdown_Sell_list();
        //buy currency dropdown list
        currency_dropdown_Buy_list();
    });
    /*
     * Country flag
     * @return {string} flag name
     */
    function country_flag(flag_name) {
        $.each(flags, function (i, flag) {
            //checking if flag name is equal to flag name entering
            if (flag.flag_name == flag_name) {
                console.log(flag.flag_name);
                //return flag.flag_name;
            };
        });
    };
    /*
     * Countries flag
     * @return {string} flag name
     */
    function countries_flag() {
        $.each(flags, function (i, flag) {
            country_flag(flag.flag_name);
        });
    };
    /**
     * Currency sell list
     * @return {string} flag name
     * @return {string} currency name
     */
    function currency_dropdown_Sell_list() {
        var drop_list = "";
        drop_list += "<ul id=\'dropdown_current\' class=\'dropdown-menu\'>"
        $.each(flags, function (i, value) {
            drop_list += "<li data-currency-tag=\'" + value.currency_tag + "\' data-flag-name=\'" + value.flag_name + "\' data-currency-name=\'" + value.currency_name + "\'>" + "<i class=\'flag flag-" + value.flag_name + "\'></i>" + "<span class=\'flag_name\'>" + value.currency_name + "</span>" + "</li>";
        }) + "</ul>";
        $("#currencyHave").append(drop_list);
    };
    /**
     * Currency buy list
     * @return {string} flag name
     * @return {string} currency name
     */
    function currency_dropdown_Buy_list() {
        var drop_list = "";
        drop_list += "<ul id=\'dropdown_change\' class=\'dropdown-menu\'>"
        $.each(flags, function (i, value) {
            drop_list += "<li data-currency-tag=\'" + value.currency_tag + "\' data-flag-name=\'" + value.flag_name + "\' data-currency-name=\'" + value.currency_name + "\'>" + "<i class=\'flag flag-" + value.flag_name + "\'></i>" + "<span class=\'flag_name\'>" + value.currency_name + "</span>" + "</li>";
            //console.log(i+" " +value.flag_name+" "+ value.currency_name)
        }) + "</ul>";
        $("#currencyChange").append(drop_list);
    };
    $("#base_currncInpt").on("focus", function () {
        //console.log("yap")
        $("#dropdown_current").css("display", "block")
    });
    is_current_opened = false;
    $("#base_currncInpt").on("blur", function () {
        //checking if dropdown list is open
        is_current_opened = true;
    });
    $("body:not(#dropdown_current)").on("click", function () {
        //console.log("outside");
        if (is_current_opened) {
            is_current_opened = false;
            $("#dropdown_current").hide();
        }
        else {}
    });
    //Loading default input value for sell currency
    $("#base_currncInpt").val("United States Dollar");
    //Loading default input value for buy currency
    $("#base_changing").val("Tanzanian Shilling");
    //loading sell currency amount
    $("#sell_currency").val(1);
    /**
     * Creating events
     * @param {sstring}sell_currency
     * @param {string}buy_currency
     * @return currency
     * @return flag
     */
    function currency_default_load(sell_currency, buy_currency) {
        sell = sell_currency; //sell_currency_side;
        buy = buy_currency;
        console.log("Default --- > Selling Currency : " + sell_currency + " Buying Currency : " + buy_currency)
        $("#base_currncInpt").on("focus", function () {
            //console.log("yap")
            $(this).val("");
        });
        $("#base_changing").on("focus", function () {
            //console.log("yap")
            $(this).val("");
        });
        $('#sell_currency').on("focus", function () {
            $(this).val("");
        });
        get_baseRates(sell_currency);
        console.log(selling_rates);
        var default_price = $('#sell_currency').val();
        $.each(selling_rates, function (i, selling_rate) {
            if (i == buy_currency) {
                console.log(selling_rate);
                var buying_rate = default_price * selling_rate;
                console.log(buying_rate)
                var buying_round = (buying_rate).toFixed(2);
                //var w = Math.round(buying_rate)
                $("#buying_currency").val(buying_round);
                $('#buying_currency').val(function (index, value) {
                    return value
                        // .replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                })
            };
        });
    };
    $('#currencyHave').delegate("#dropdown_current li", "click", function () {
        var sell_currencyName = $(this).attr("data-currency-name");
        var sell_flagName = $(this).attr("data-flag-name");
        var selling_currency_tag = $(this).attr("data-currency-tag");
        console.log(selling_currency_tag);
        //currency_tag(c);
        sell = selling_currency_tag;
        //change country name
        $("#base_currncInpt").val(sell_currencyName);
        //change flag image
        $(".flag-sell i").attr("class", "flag flag-" + sell_flagName);
        //console.log(d)
    });
    $("#currencyChange").delegate("#dropdown_change li", "click", function () {
        var buy_currencyName = $(this).attr("data-currency-name");
        var buy_flagName = $(this).attr("data-flag-name");
        var buying_currency_tag = $(this).attr("data-currency-tag");
        buy = buying_currency_tag;
        //change country name
        $("#base_changing").val(buy_currencyName);
        //change flag name
        $(".flag-buy i").attr("class", "flag flag-" + buy_flagName);
    });
    $('#sell_currency').on("keyup", function () {
        var currency_left_sell = $(this).val();
        console.log(currency_left_sell);
        console.log(sell);
        //console.log(buy);
        selling_currency_rates(sell, currency_left_sell)
    });
    /**
     * Creating events
     * @param {string}sell_rate_data
     * @param {number}buying_rate_data
     * @return {number} calculating rates
     */
    function selling_currency_rates(sell_rate_data, buying_rate_data) {
        get_baseRates(sell_rate_data);
        console.log(selling_rates)
        $.each(selling_rates, function (i, selling_rate) {
            if (i == buy) {
                console.log(selling_rate);
                var buying_rate = buying_rate_data * selling_rate;
                console.log(buying_rate)
                var buying_round = (buying_rate).toFixed(2);
                //var w = Math.round(buying_rate)
                $("#buying_currency").val(buying_round);
                $("#buying_currency").val(function (index, value) {
                    return value
                        // .replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                })
            };
        });
    }
    $("#calculate_rate_btn").on("click", function (e) {
        e.preventDefault();
        var currency_left_sell = $("#sell_currency").val();
        console.log(currency_left_sell);
        console.log(sell);
        //console.log(buy);
        get_baseRates(sell);
        console.log(selling_rates)
        $.each(selling_rates, function (index, selling_rate) {
            if (index == buy) {
                console.log(selling_rate);
                var buying_rate = currency_left_sell * selling_rate;
                console.log(buying_rate)
                $("#buying_currency").val(buying_rate);
            };
        });
    });
    //swaping currency from selling side to the buying side
    $("#swap_currency_btn").on("click", function (e) {
        e.preventDefault();
        var sell_currency = $("#base_currncInpt").val();
        $("#base_currncInpt").val($("#base_changing").val());
        $("#base_changing").val(sell_currency);
        var sell_flag = $(".flag-sell i").attr("class");
        var buy_flag = $(".flag-buy i").attr("class")
        var change_sell_flag = $(".flag-buy i").attr("class", sell_flag);
        var change_buy_flag = $(".flag-sell i").attr("class", buy_flag);
        //slice class attribute to get flag tag name
        var get_sell_flag = sell_flag.slice(-2)
        var get_buying_flag = buy_flag.slice(-2)
        var swap_selling_currency;
        var swap_buying_currency;
        $.each(flags, function (index, flag) {
            if (get_sell_flag == flag.flag_name) {
                //console.log("sell currency " + flag.currency_tag)
                swap_selling_currency = flag.currency_tag;
                
            }
            else if (get_buying_flag == flag.flag_name) {
                //console.log("buy currency " + flag.currency_tag)
                swap_buying_currency = flag.currency_tag
                $("#country_name_tab").html(flag.country_name);
                //changing currency name on county tab
                $("#currency_name_tab").html(flag.currency_name);
            };
        });
        currency_default_load(swap_buying_currency, swap_selling_currency)
    });
    $("#leftSide_rates").delegate("#popular_rate_table tr", "click", function (e) {
        var id_base = $(e.currentTarget).attr("data-base-id");
        var id_index = $(e.currentTarget).attr("data-id");
        sell = id_base;
        buy = id_index;
        //get popular rate by clicking any popular rate from popular currency list
        getPopular_rate(sell, buy)
    });
    /**
     * Geting popular currency rate
     * @param {string}sell_currency_code
     * @param {string}buy_currency_code
     * @return {string} currency_rate
     */
    function getPopular_rate(sell_currency_code, buy_currency_code) {
        var selling_currency_code;
        var buying_currency_code;
        $.each(rates, function (index, rate) {
            //checking sell currency is equal to rate base
            if (sell_currency_code == rate.base) {
                selling_currency_code = sell_currency_code;
                //checking flags
                $.each(flags, function (index, flag) {
                    if (selling_currency_code == flag.currency_tag) {
                        console.log(flag.flag_name)
                        console.log(flag.currency_name)
                            //changing country name
                        $("#base_currncInpt").val(flag.currency_name);
                        //changing flag image
                        $(".flag-sell i").attr("class", "flag flag-" + flag.flag_name);
                        //changing country name on county tab
                        $("#country_name_tab").html(flag.country_name);
                        //changing currency name on county tab
                        $("#currency_name_tab").html(flag.currency_name);
                    }
                })
            }
            else if (buy_currency_code == rate.base) {
                buying_currency_code = buy_currency_code;
                //checking flag
                $.each(flags, function (index, flag) {
                    if (buying_currency_code == flag.currency_tag) {
                        console.log(flag.flag_name)
                        console.log(flag.currency_name)
                            //changing input value
                        $("#base_changing").val(flag.currency_name);
                        //changing flag name
                        $(".flag-buy i").attr("class", "flag flag-" + flag.flag_name);
                    }
                })
            };
        });
        return currency_default_load(selling_currency_code, buying_currency_code);
    };
    /**
     * function for popular rates
     * @return {string} popular rates
     */
    function popular_rates() {
        //variable for making ID
        var count_id = 0
        $.each(rates, function (index, rate) {
            console.log(rate);
            console.log(rate.base);
            var base = rate.base
            var base_rates = rate.rates
            $.each(base_rates, function (index, base_rate) {
                count_id = count_id + 1
                    //Bulding UI for popular div
                return popular_UI(base, count_id, index, base_rate);
            });
        });
    };
    /**
     * bulding UI for popular div
     * @param {string}country_base
     * @param {number}country_id
     * @param {string}base_rate_index
     * @param {string}base_currency_rate
     * @return {string} popular div
     */
    function popular_UI(country_base, country_id, base_rate_index, base_currency_rate) {
        var popular_div = "";
        popular_div += "<tr id=" + country_base + country_id + " data-base-id=" + country_base + " data-id=" + base_rate_index + " >" + "<td class=\'separa_line\'>" + country_base + "/" + base_rate_index + "</td>" + "<td>" + base_currency_rate + "</td>" + "<td>+0,0009%</td>" + "</tr>";
        $("#leftSide_rates #popular_rate_table").append(popular_div);
        return popular_div;
    };
    /**
     * Geting base rates
     * @param {string}flag_tag
     * @return {string} rates
     */
    function get_baseRates(flag_tag) {
        $.each(rates, function (i, rate) {
            //checking flag tag entering by user is equal with rate base
            if (flag_tag == rate.base) {
                selling_rates = rate.rates;
            };
        });
    };
    //making dropdown change list visible when change input is focus
    $("#base_changing").on("focus", function () {
        //chacking #dropdown_change display from hidden to block
        $("#dropdown_change").css("display", "block")
    });
    is_change_opened = false;
    $("#base_changing").on("blur", function () {
        is_change_opened = true;
    });
    $("body:not(#dropdown_change)").on("click", function () {
        //console.log("outside");
        if (is_change_opened) {
            is_change_opened = false;
            $("#dropdown_change").hide();
        }
        else {}
    });
})