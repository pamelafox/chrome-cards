function createTable(tableData) {
  var table = document.createElement('table')
    , tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

var teamInfo = [];
$('.team-card').each(function() { 
   var name = $(this).find('.card-info h2').text();
   var pic = $(this).find('.card-photo img').attr('src');
   var title = $(this).find('.card-info h3').text();
   var bio = $(this).find('.card-info p:not(.contact-links)').text().replace(/(?:\r\n|\r|\n)/g, ' ')
   var memberInfo = [name, pic, title, bio];
   teamInfo.push(memberInfo);
});
var table = createTable(teamInfo); $('body').append(table);

