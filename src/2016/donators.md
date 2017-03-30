---
layout: default
title: Partners
---
Buy a "Generous donator" pass to get your name displayed on this page as one of the absolute Scala.IO supporter !


Scala.IO 2016
===============

<div class="speakers">
{% if site.data.donators.ScalaIO2016 %}
  {% for donator in site.data.donators.ScalaIO2016 %}
  <div class="row">
    <div class="speaker_bio col-sm-offset-1">
      <h2 class="name">{{donator.name}}
      <span class="details">
      <a href="http://twitter.com/{{donator.twitter}}"><i class="fa fa-twitter"></i></a>
      <span class="company">{{donator.company}}</span>
      </span>
      </h2>
    </div>
  </div>
  {% endfor %}
{% else %}
  <div class="row">
    <div class="speaker_bio col-sm-offset-1">
      <h2>Be the first for Scala.IO 2016 !</h2>
    </div>
  </div>
{% endif %}
</div>

Scala.IO 2014
===============

<div class="speakers">
{% for donator in site.data.donators.ScalaIO2014 %}
<div class="row">
  <div class="speaker_bio col-sm-offset-1">
    <h2 class="name">{{donator.name}}
    <span class="details">
    <a href="http://twitter.com/{{donator.twitter}}"><i class="fa fa-twitter"></i></a>
    <span class="company">{{donator.company}}</span>
    </span>
    </h2>
  </div>
</div>
{% endfor %}
</div>
</div>
