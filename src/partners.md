---
layout: default
title: Partners
---
Gold Sponsors
================

{% for sponsor in site.data.sponsors.gold %}
<div class="partner-gold span-gold">
  <a href="{{sponsor.url}}">
    <img src="assets/images/partners/gold/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
  </a>
</div>
{% endfor %}

Silver Sponsors
================

{% for sponsor in site.data.sponsors.silver %}
<div class="partner-silver span-silver">
  <a href="{{sponsor.url}}">
      <img src="assets/images/partners/silver/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
  </a>
</div>

{% endfor %}
