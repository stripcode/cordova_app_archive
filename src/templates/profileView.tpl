<ul class="table-view">
  <li class="table-view-cell">ФИО: {{ fio }}</li>
  <li class="table-view-cell">л/с: {{ number }}</li>
  <li class="table-view-cell">адрес: {{ house.street.city.name }}, {{ house.street.name }}, {{ house.number }}, кв.№{{ flatNumber }}</li>
  <li class="table-view-cell">email: {{ email }}</li>
</ul>