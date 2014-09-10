---
layout: default
title: Partners
---
<div class="partners">
<h1 class="partner-heading">Platinum Sponsor</h1>

{% for sponsor in site.data.sponsors.platinum %}
<div class="partner-platinum span-platinum">
  <a href="{{sponsor.url}}">
    <img src="assets/images/partners/platinum/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
  </a>
</div>
{% endfor %}


<h1 class="partner-heading">Gold Sponsors</h1>
<div class="partners-gold">
{% for sponsor in site.data.sponsors.gold %}
<div class="partner-gold">
  <a href="{{sponsor.url}}">
    <img src="assets/images/partners/gold/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
  </a>
</div>
{% endfor %}
</div>

<h1 class="partner-heading">Silver Sponsors</h1>
<div class="partners-silver">
{% for sponsor in site.data.sponsors.silver %}
<div class="partner-silver">
  <a href="{{sponsor.url}}">
      <img src="assets/images/partners/silver/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
  </a>
</div>
{% endfor %}
</div>

<h1 class="partner-heading">Partners</h1>

{% for sponsor in site.data.sponsors.friends %}
<div class="partner-friends span-friends">
  <a href="{{sponsor.url}}">
      <img src="assets/images/partners/friends/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
  </a>
</div>
{% endfor %}

<h1 class="partner-heading">User Groups</h1>

{% for sponsor in site.data.sponsors.ug %}
<div class="partner-friends span-friends">
  <a href="{{sponsor.url}}">
      <img src="assets/images/partners/ug/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
  </a>
</div>
{% endfor %}

<h1 class="partner-heading">Communication</h1>

{% for sponsor in site.data.sponsors.communication %}
<div class="partner-friends span-friends">
  <a href="{{sponsor.url}}">
      <img src="assets/images/partners/com/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
  </a>
</div>
{% endfor %}
</div>
