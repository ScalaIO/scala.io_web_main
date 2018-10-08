---
layout: page
title: Partners
---
<div class="sponsors">
  <h1>Platinum Sponsor</h1>

  {% for sponsor in site.data.sponsors.platinum %}
  <div class="platinum">
    <a href="{{sponsor.url}}">
      <img src="assets/images/partners/logo-{{ sponsor.name }}.svg" alt="Logo {{ sponsor.name }}">
    </a>
  </div>
  {% endfor %}


  <h1>Gold Sponsors</h1>
  <div class="gold">
  {% for sponsor in site.data.sponsors.gold %}
    <a href="{{sponsor.url}}">
      <img src="assets/images/partners/logo-{{ sponsor.name }}.svg" alt="Logo {{ sponsor.name }}">
    </a>
  {% endfor %}
  </div>

  <h1>Silver Sponsors</h1>
  <div class="silver">
  {% for sponsor in site.data.sponsors.silver %}
    <a href="{{sponsor.url}}">
        <img src="assets/images/partners/logo-{{ sponsor.name }}.svg" alt="Logo {{ sponsor.name }}">
    </a>
  {% endfor %}
  </div>

  <h1 >T-Shirt sponsor</h1>
  <div class="gold">  
    <a href="{{site.data.sponsors.tshirt.url}}">
        <img src="assets/images/partners/logo-{{ site.data.sponsors.tshirt.name }}.svg" alt="Logo {{ site.data.sponsors.tshirt.name }}">
      </a>
  </div>
  <h1 >Bag sponsor</h1>
  <div class="gold">  
    <a href="{{site.data.sponsors.bag.url}}">
        <img src="assets/images/partners/logo-{{ site.data.sponsors.bag.name }}.svg" alt="Logo {{ site.data.sponsors.bag.name }}">
      </a>
  </div>

  <h1>Partners</h1>
  <div class="friends">
  {% for sponsor in site.data.sponsors.friends %}
    <a href="{{sponsor.url}}">
        <img src="assets/images/partners/friends/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
    </a>
  {% endfor %}
  </div>


  <h1>User Groups</h1>
  <div class="friends">
  {% for sponsor in site.data.sponsors.ug %}
  <div class="ug">
    <a href="{{sponsor.url}}">
        <img src="assets/images/partners/sug/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
    </a>
  </div>
  {% endfor %}
  </div>

  <h1 class="partner-heading">Communication</h1>
  <div class="partners-friends">
  {% for sponsor in site.data.sponsors.communication %}
  <div class="partner-comm">
    <a href="{{sponsor.url}}">
        <img src="assets/images/partners/com/logo-{{ sponsor.name }}.png" alt="Logo {{ sponsor.name }}">
    </a>
  </div>
  {% endfor %}
  </div>
</div>
