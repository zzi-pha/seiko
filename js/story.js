$(document).ready(function () {

      $(document).on("click", "#menu", function () {
        $("#black_bg").show();
      });

      $(document).on("click", "#turnOff", function () {
        $("#black_bg").hide();
      });

      $("#nav>li").click(function () {
        let acco = $(this).hasClass("on");

        // 모든 li 요소에서 on 클래스와 하위의 #sub 엘리먼트에 대한 슬라이드를 닫음
        $("#nav>li").removeClass("on").children("#sub").slideUp();

        if (!acco) {
          // 클릭한 li에 대해서만 on 클래스를 추가하고 하위의 #sub 엘리먼트에 대한 슬라이드를 엶
          $(this).addClass("on").children("#sub").slideDown();
        }
      });

      $("#nav #sub").click(function (event) {
        // #sub 클릭 시 부모 li의 이벤트를 방지하여 슬라이드가 올라가지 않도록 함
        event.stopPropagation();
      });

      
      $("#black_bg").click(function (event) {
        // 만약 클릭된 요소가 "black_bg" 자신이라면 숨깁니다.
        if (event.target.id === "black_bg") {
          $(this).hide();
        }
      });

      var $slideButton1 = $("#slidebtn1");
      var $slideButton2 = $("#slidebtn2");
      var $slideButton3 = $("#slidebtn3");
      
      var $presageItems = $("#presage li");
      var $porspexItems = $("#porspex li");
      var $sportItems = $("#sport li");
      
      $slideButton1.click(function () {
        console.log('1실행');
        animateItems($presageItems, 12, 13);
        resetItems($porspexItems, $sportItems);
        console.log('1종료');
      });
      
      $slideButton2.click(function () {
        console.log('2실행');
        animateItems($porspexItems, 15, 15);
        resetItems($presageItems, $sportItems);
        console.log('2종료');
      });
      
      $slideButton3.click(function () {
        console.log('3실행');
        animateItems($sportItems, 10, 12);
        resetItems($presageItems, $porspexItems);
        console.log('3종료');
      });
      
      function animateItems($items, multiplier, offset) {
        $items.each(function (index) {
          var $item = $(this);
          if ($item.is(":hidden")) {
            $item
              .stop()
              .show()
              .animate({ left: `${index * multiplier + offset}%` });
          } else {
            $item.stop().animate({ left: "0%" }, function () {
              $item.hide();
            });
          }
        });
      }
      
      function resetItems() {
        var items = Array.from(arguments);
        items.forEach(function ($items) {
          $items.stop().animate({ left: "0%" }, function () {
            $(this).hide();
          });
        });
      }
      
      $(document).click(function (event) {
        event.stopPropagation();
        var items = [$presageItems, $porspexItems, $sportItems];
        items.forEach(function ($items, index) {
          var $button = [ $slideButton1, $slideButton2, $slideButton3 ][index];
          if (!$button.is(event.target) &&
              !$items.is(event.target) &&
              $items.has(event.target).length === 0) {
            resetItems($items);
          }
        });
      });


      let list = $(".btn>li.on").index(); //0넣어도됨~, 0이라는 값이 이미 들어있음 list = 0;
      let wid = $(".carousel").width();
      let count = $(".panel>li").length;//속성은 가로없음. 갯수알려주는 메소드 . count=3들어있음
      $(".btn>li").click(function(){
        list = $(this).index();
        
        $(".btn>li").removeClass("on");
        $(this).addClass("on");
        $(".panel").stop().animate({"margin-left": -wid * list});
      });

      $(".next").click(function(){
      
        if(list == count-1){ //count-1자리에 2가 들어가도됨.
          list = 0;
        }else{
          list++; //1씩증가
        }
        $(".btn>li").removeClass("on");    //인디게이터 버튼과 같이동작
        $(".btn>li").eq(list).addClass("on");  //인디게이터 버튼과 같이동작
        $(".panel").stop().animate({"margin-left": -wid * list});
      });
      $(".prev").click(function(){
        if(list == 0){ 
          list = 2;
        }else{
          list--;
        }
        $(".btn>li").removeClass("on");  //인디게이터 버튼과 같이동작
        $(".btn>li").eq(list).addClass("on"); //인디게이터 버튼과 같이동작
        $(".panel").stop().animate({"margin-left": -wid * list});
      });

    });
