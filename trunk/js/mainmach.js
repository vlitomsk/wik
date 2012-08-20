// ���������� ���������� DOM
$(function ()
{
  sort.totaltask   = tasks.length;  // ����� �������
  sort.ntask       = 0;             // ����� �������� ������� 
  sort.numAllDrop  = 0;  // ����� ����� �������
  sort.numAllDropI  = 0;  // ����� ����� ������� ��� �������� �������
  sort.numTrueDrop = 0;  // ����� ���������� ������� 
  sort.begin(); 
  
  $("#sort_clear")
    .mouseup(function () 
      {
        sort.totaltask   = tasks.length;  // ����� �������
        sort.ntask       = 0;             // ����� �������� ������� 
        sort.numAllDrop  = 0;  // ����� ����� �������
        sort.numTrueDrop = 0;  // ����� ���������� �������
        sort.numAllDropI  = 0;  // ����� ����� ������� ��� �������� ������� 
        sort.begin(); 
        this.src='pic/clear1.png';
      })
    .mousedown(function () 
      {
        this.src='pic/clear3.png';
      })
    .mouseover(function () 
      {
        this.src='pic/clear2.png';
      })
    .mouseout(function () 
      {
        this.src='pic/clear1.png';
      })


    $("#index").mouseup(function () {
        this.src = 'pic/index1.png';
        location = 'index.htm';
    }).mousedown(function () {
        this.src = 'pic/index3.png';
    }).mouseover(function () {
        this.src = 'pic/index2.png';
    }).mouseout(function () {
        this.src = 'pic/index1.png';
    })

    $("#game").mouseup(function () {
        this.src = 'pic/game1.png';
        location = 'game.htm';
    }).mousedown(function () {
        this.src = 'pic/game3.png';
    }).mouseover(function () {
        this.src = 'pic/game2.png';
    }).mouseout(function () {
        this.src = 'pic/game1.png';
    })

});


// ���������� ��� �����������
// --------------------------
var sort = {};

// ���������
// ===================================================================
sort.mess = [
"<SPAN>����:<BR>����������<BR>�������:<BR>���������<BR>������ ������<BR>�&nbsp;����&nbsp;����</SPAN>",
"<SPAN>�������<BR>���������!</SPAN>",
"<SPAN>����<BR>���������!</SPAN>"
            ];

sort.picStatus = ['pic/z.png', 'pic/bad.png', 'pic/middle.png',
                  'pic/middle.png', 'pic/good.png'
                 ];
sort.picStatus1 = ['pic/z.png', 'pic/bad.png', 'pic/middle.png',
                  'pic/middle.png', 'pic/good.png'
                 ];
// �������
// ===================================================================

// ����� �������
var tasks = [                                      
{ // ������ �������
  // ������������� �����
  boxes: ["������������<BR>�������", "��������������<BR>�������"],
  // �������
  �bjects:
        [
          {                       // ������ ������
            numberBox:1,          // ����� ����� 
            pic:"pic/grezol.png",  // ���� � ��������
            left:10, top:10       // ���������� �������� 
          },
          {                       // ������ ������
            numberBox:0,          // ����� ����� 
            pic:"pic/greli.png",  // ���� � ��������
            left:320, top:130     // ���������� �������� 
          },
          {                       // ������ ������
            numberBox:1,          // ����� ����� 
            pic:"pic/bygon.png",  // ���� � ��������
            left:30, top:240      // ���������� �������� 
          },
          {                       // �������� ������
            numberBox:0,          // ����� ����� 
            pic:"pic/kalen.png",  // ���� � ��������
            left:280, top:300     // ���������� �������� 
          },
          {                       // ����� ������
            numberBox:0,          // ����� ����� 
            pic:"pic/orion.png",  // ���� � ��������
            left:100, top:400     // ���������� �������� 
          }
        ]
},
{ // ������ �������
  // ������������� �����
  boxes: ["<BR>��", "<BR>���"],
  // �������
  �bjects:
        [
          {                       // ������ ������
            numberBox:1,          // ����� ����� 
            pic:"pic/deva.png",  // ���� � ��������
            left:5, top:5       // ���������� �������� 
          },
          {                       // ������ ������
            numberBox:0,          // ����� ����� 
            pic:"pic/proff.png",  // ���� � ��������
            left:240, top:100     // ���������� �������� 
          },
          {                       // ������ ������
            numberBox:1,          // ����� ����� 
            pic:"pic/rol.png",  // ���� � ��������
            left:10, top:200      // ���������� �������� 
          },
          {                       // ����� ������
            numberBox:0,          // ����� ����� 
            pic:"pic/eagl.png",  // ���� � ��������
            left:10, top:370     // ���������� �������� 
          },
          {                       // �������� ������
            numberBox:0,          // ����� ����� 
            pic:"pic/dance.png",  // ���� � ��������
            left:240, top:280     // ���������� �������� 
          }

        ]
}                                       
            ];

// ===================================================================

// ������ ������
//---------------
sort.begin = function ()                    
{
  // ����������� �������� �������� �� ����� ������ ������
//  $("#sort_z").html("<IMG src='pic/fon-ocenka.png' alt=''>");
    $("#sort_z").html("");


  // ����������� �������� ���������
  $("#sort_mess").html(sort.mess[0]);
  
  // �������� ��������� � ����� �������� �������
  $("#sort_ntask").html("������<BR>�������:<BR><SPAN>&nbsp;</SPAN> �� <SPAN>&nbsp;</SPAN>");

  sort.numTrueDropI = 0; // ����� ���������� ������� ��� ������� ������ 
  sort.numAllDropI  = 0;  // ����� ����� ������� ��� �������� �������

  // ������ �������:
  sort.numOfSolve();

  // ������� ���������������� �������������� 
  $('#sort_area_�bjects IMG').draggable('destroy');
  $("#sort_area_boxes DIV").droppable('destroy');
  $("#sort_area_boxes").show();

  // ����� �������� ����������� �������
  $("#sort_area_�bjects").html("&nbsp;");  
  // ����� �������� �� ���� ��� �������� �������
  sort.showPictures();

  // ����� ������ ����������� �������
  $("#sort_area_boxes").html("&nbsp;");  
  // ����� ������ ���������� ��� �������� �������
  sort.showBoxes();
}

// ������ �������:  
// ---------------
sort.numOfSolve = function ()
{
  $("#sort_ntask SPAN:first").html(sort.ntask);
  $("#sort_ntask SPAN:last").html(sort.totaltask);
}

// ����� �������� �� ����
// ----------------------
sort.showPictures = function ()
{
  for (var i=0; i<tasks[sort.ntask].�bjects.length; i++)
  { 
    $('<IMG src="'+tasks[sort.ntask].�bjects[i].pic+'">') // ������
      .attr('numberBox',tasks[sort.ntask].�bjects[i].numberBox)
      .css('left',tasks[sort.ntask].�bjects[i].left) // �������������    
      .css('top',tasks[sort.ntask].�bjects[i].top)   // ...
      .appendTo("#sort_area_�bjects");               // ���������
  }    

  // �������������� ���� �������� � ������� sort_area_�bjects
  $('#sort_area_�bjects IMG').draggable(
    {
      cursor:"move",     // ������� ��� �������
    // revert:'invalid',  // ������� ������� � �������� �������
     revert:true, 
     scroll:false,      // ��������� ������ �������� ��� ��������������
      zIndex:50,         // ������� �������� ��� ������� ���������� 
      stop:sort.stop     // ������� ������� 
    });
}

// ������� ������� 
// ----------------------------
sort.stop = function(event, ui)
{
  sort.numAllDrop++; // �������� ������� ������� �� 1 ���������
  sort.numAllDropI++; // �������� ������� ������� �� 1 ��� �������� �������

}

// ����� ������ ��� ����������
// ---------------------------
sort.showBoxes = function ()
{
  var d = 10;                               // ���������� ����� �������
  var n = tasks[sort.ntask].boxes.length;   // ���������� ������
  var w = Math.round((parseInt($("#sort_area_boxes").css('width'))-d*(n-1))/n);       
  var h = $("#sort_area_boxes").css('height');

  for (var i=0; i<n; i++)
    $('<DIV></DIV>')                        // ������ ����
      .attr('numberBox',i)
      .css('left',i*(w + d)+'px')           // �������������    
      .css('width',w+'px')                  // ������ �����
      .css('height',h)                      // ������ �����
      .css('font-size',(26-2*n)+'px')       // ������ ������
      .html(tasks[sort.ntask].boxes[i])     // �������
      .appendTo("#sort_area_boxes")         // ���������
      .droppable(
        {                           // ����� ����� � ����������
         hoverClass: 'boxhover',  // ������� ��� ������          
   /*      accept: function (pic){
                   if ($(pic).attr('numberBox') == 
                        $(this).attr('numberBox')) return true;
                    else                           return false;
                  },*/
         
          
          drop: sort.drop // ������� ������� � ���� ����  
        }
                );
}

// ������� ������� � ���� ���� 
// ----------------------------
sort.drop = function(event, ui)
{
  if($(ui.draggable).attr('numberBox') == $(this).attr('numberBox'))
  {
  // ������ ������� 
  $(ui.draggable)
    .draggable('disable')
    .hide('slow');

  // ����� ���������� �������
   sort.numTrueDrop++;  // ���������
   sort.numTrueDropI++; // ��� ������� ������ 

  // ��������, ��� �� �������� ��������
  if(sort.numTrueDropI >= tasks[sort.ntask].�bjects.length) 
  {
    // ������� ���������, ��� �������� �������� 

    // tasks[sort.ntask].�bjects.length - ���-�� ��������� � �������
    // sort.numAllDropI - ����� ����� ������� ��� �������� �������

    // ����� ������ �� �������
    sort.numAllDropI++;
    if (sort.numAllDropI == tasks[sort.ntask].�bjects.length)
    {
       $("#sort_z").html("<IMG id=good1 src='pic/prav30.gif'>");
    }
    else
    {
       $("#sort_z").html("<IMG id=bad1 src='pic/prav10.gif'>");
    }

    sort.ntask++;

    // ������ �������:
    sort.numOfSolve(); 

    //    $("#sort_mess").html(sort.mess[1]);


    // ��� ��������� � �����?
    if(sort.ntask >= sort.totaltask)
    {
      // ��, ��� ���������
      // ����� ������
      var error = sort.numAllDrop-sort.numTrueDrop + 1; // +1, ��� sort.stop ���  
                                                        // �� ���������
      var bonus; 

      if      (error == 0)  bonus = 5;
      else if (error > 0)   bonus = 2;
      
            // �������� ������ �� ��� ����: 
            // ���������, ���� ����� ��������� ��� �������
            if (error == 0) {
               $("#sort_z").html("<IMG id=bad src='pic/good.png'>");           
            }
            else 
             if (error < sort.totaltask) {
               $("#sort_z").html("<IMG id=bad src='pic/middle.png'>");
              }           
             else {
              $("#sort_z").html("<IMG id=bad src='pic/bad.png'>");
             } 


      // ������� ������
      // $("#sort_z").html("<IMG src=" + sort.picStatus[bonus-1] + " alt='' border=0>");
      //--
        $("#sort_z")
          .mouseover(function () 
           {
             this.src=sort.picStatus1[bonus-1];
           })
          .mouseout(function () 
           {
             this.src=sort.picStatus[bonus-1];
           })
      //--

      // ������� ����������� ���������
      $("#sort_mess").html("&nbsp;");
      $("#sort_mess").html(sort.mess[2]);

      // ������� ����������� �������� �� ���� ��������
      $("#sort_area_�bjects").html("");   //----------------------
      $("<IMG id=sortfin src='pic/endgame.png' alt=''>")
        .css('position','absolute')     
        .css('left',140)     
        .css('top',130) 
        .css('width', 420) // � �������    
        .css('height', 400) // � �� ������ ����,   
        .css('display','none') 
        .appendTo("#sort_area_�bjects")
        .fadeIn('slow'); 
      $("#sort_area_boxes").hide();
      // ������� �� ������ �����
//      $("#sort_mess").html("<A href=index.htm><IMG src='pic/index.png' alt=''></A>");
    }
    else 
    {
      // ���, ��� �� ���������, ������ ���������

      $("#sort_area_�bjects").html("");   //----------------------
      $("<IMG id=testfin src='pic/endzad.png' alt=''>")  // ���������� IMG 
        .css('position','absolute')      // ������������� ��������   
        .css('left',160)                  // � �������    
        .css('top',110)                   // � �� ������ ����, 
        .css('width', 382) // � �������    
        .css('height', 387) // � �� ������ ����,
        .appendTo("#sort_area_�bjects"); // �� ������� ���� ������� 

      // ����� 500 ����������� ����� �������� � ������
      // � �������� ����� sort.begin, ������� �������� ����� �������:
      var t = setTimeout( function ()
                          {
                            clearTimeout(t);
                            $("#sort_area_�bjects #testfin").hide('slow', sort.begin);
                          }, 3500);
      }
    }
  }
}
