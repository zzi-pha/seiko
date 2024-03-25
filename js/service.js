$(document).ready(function () {
  calculate();

  function calculate() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      // 작은 화면에 대한 변경된 스크립트
      console.log("작은 화면입니다.");
      $(document).on("click", "#menu", function () {
        $("#black_bg").show();
      });

      $(document).on("click", "#turnOff", function () {
        $("#black_bg").hide();
      });


      // $(".container").off("wheel");
      $("#nav>li").off("click");
      $("#nav #sub").off("click");

      $("#black_bg").click(function (event) {
        // 만약 클릭된 요소가 "black_bg" 자신이라면 숨깁니다.
        if (event.target.id === "black_bg") {
          $(this).hide();
        }
      });
      $("#header").click(function () {
        $("#black_bg").hide();
      });
      


    } else {
      // 큰 화면에 대한 스크립트
      console.log("큰 화면입니다.");

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

    }
  }

  $('#rolling').slick({
    autoplay: true, // 자동 재생 설정
    autoplaySpeed: 2500, // 재생 속도 (ms)
    infinite: true, // 무한 반복 여부
    slidesToShow: 1, // 보여질 슬라이드 개수
    slidesToScroll: 1, // 슬라이드 이동 시 이동하는 슬라이드 개수
    vertical: true, // 수직 방향 슬라이드 설정
    verticalSwiping: true, // 수직 방향 스와이프 설정
    dots: false, // 동그라미 형태의 페이지네이션 표시 여부
    arrows: false // 이전/다음 화살표 표시 여부
});

});
