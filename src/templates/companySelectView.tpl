<h4>Выберите компанию</h4>
<ul class="table-view">
  {% for company in items %}
  <li class="table-view-cell" companyId="{{ company.id }}">
    <a class="navigate-right">{{ company.name }}</a>
  </li>
  {% endfor %}
</ul>