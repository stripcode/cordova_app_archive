<h4>Выберите город</h4>
<ul class="table-view">
  {% for city in items %}
  <li class="table-view-cell" cityId="{{ city.id }}">
    <a class="navigate-right">{{ city.name }}</a>
  </li>
  {% endfor %}
</ul>