<h4>Выберите область</h4>
<ul class="table-view">
  {% for region in items %}
  <li class="table-view-cell" regionId="{{ region.id }}">
    <a class="navigate-right">{{ region.name }}</a>
  </li>
  {% endfor %}
</ul>