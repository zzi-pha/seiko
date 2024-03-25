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

      $(".container").on("wheel", function (e) {
        e.preventDefault();
        let delta = e.originalEvent.deltaY || -e.originalEvent.detail;
        let boxWidth = $(".box").outerWidth();
        let scrollDistance = delta > 0 ? boxWidth * 1 : -boxWidth * 1;

        let currentScrollLeft = $(this).scrollLeft();
        let nextScrollLeft = currentScrollLeft + scrollDistance;
        $(this)
          .stop()
          .animate({ scrollLeft: nextScrollLeft + "px" }, 500);
      });
    }
  }
});




// var $slideButton1 = $("#slidebtn1");
// var $slideButton2 = $("#slidebtn2");
// var $slideButton3 = $("#slidebtn3");

// var $presageItems = $("#presage li");
// var $porspexItems = $("#porspex li");
// var $sportItems = $("#sport li");

// $slideButton1.click(function () {
//   console.log('1실행');
//   $presageItems.each(function (index) {
//     var $item = $(this);
//     if ($item.is(":hidden")) {
//       $item
//         .stop()
//         .show()
//         .animate({ left: `${index * 12 + 13}%` });
//     } else {
//       $item.stop().animate({ left: "0%" }, function () {
//         $item.hide();
//       });
//     }
//   });

//   // 다른 슬라이드의 리스트 아이템은 초기 위치로 돌려놓음
//   $porspexItems.stop().animate({ left: "0%" });
//   $sportItems.stop().animate({ left: "0%" });
//   console.log('1종료');
// });

// $slideButton2.click(function () {
//   console.log('2실행');
//   $porspexItems.each(function (index) {
//     var $item = $(this);
//     if ($item.is(":hidden")) {
//       $item
//         .stop()
//         .show()
//         .animate({ left: `${index * 15 + 15}%` });
//     } else {
//       $item.stop().animate({ left: "0%" }, function () {
//         $item.hide();
//       });
//     }
//   });

//   // 다른 슬라이드의 리스트 아이템은 초기 위치로 돌려놓음
//   $presageItems.stop().animate({ left: "0%" });
//   $sportItems.stop().animate({ left: "0%" });
//   console.log('2종료');
// });

// $slideButton3.click(function () {
//   console.log('3실행');
//   $sportItems.each(function (index) {
//     var $item = $(this);
//     if ($item.is(":hidden")) {
//       $item
//         .stop()
//         .show()
//         .animate({ left: `${index * 10 + 12}%` });
//     } else {
//       $item.stop().animate({ left: "0%" }, function () {
//         $item.hide();
//       });
//     }
//   });

//   // 다른 슬라이드의 리스트 아이템은 초기 위치로 돌려놓음
//   $presageItems.stop().animate({ left: "0%" });
//   $porspexItems.stop().animate({ left: "0%" });
//   console.log('3종료');
// });

// $(document).click(function (event) {
//   event.stopPropagation();
//   if (
//     !$slideButton1.is(event.target) &&
//     !$presageItems.is(event.target) &&
//     $presageItems.has(event.target).length === 0
//   ) {
//     $presageItems.stop().animate({ left: "0%" }, function () {
//       $(this).hide();
//     });
//   }
//   if (
//     !$slideButton2.is(event.target) &&
//     !$porspexItems.is(event.target) &&
//     $porspexItems.has(event.target).length === 0
//   ) {
//     $porspexItems.stop().animate({ left: "0%" }, function () {
//       $(this).hide();
//     });
//   }
//   if (
//     !$slideButton3.is(event.target) &&
//     !$sportItems.is(event.target) &&
//     $sportItems.has(event.target).length === 0
//   ) {
//     $sportItems.stop().animate({ left: "0%" }, function () {
//       $(this).hide();
//     });
//   }
// });