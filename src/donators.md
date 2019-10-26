---
layout: page
title: Partners
---
Buy a "Generous donator" pass to get your name displayed on this page as one of the absolute Scala.IO supporter !

Scala.IO 2019
===============

{% if site.data.donators.ScalaIO2019 %}  
<ul class="donators">
{% for donator in site.data.donators.ScalaIO2019 %}
  <li>{{donator.name}} <span class="details">
    <a href="http://twitter.com/{{donator.twitter}}"><i class="fab fa-twitter"></i></a>
    <span class="company">{{donator.company}}</span>
    </span>
  </li>
{% endfor %}
</ul>
{% else %}
<h2>Be the first for Scala.IO 2019 !</h2>  
{% endif %}

Scala.IO 2018
===============

<ul class="donators">
{% for donator in site.data.donators.ScalaIO2018 %}
  <li>{{donator.name}} <span class="details">
    <a href="http://twitter.com/{{donator.twitter}}"><i class="fab fa-twitter"></i></a>
    <span class="company">{{donator.company}}</span>
    </span>
  </li>
{% endfor %}
</ul>

Scala.IO 2017
===============

<ul class="donators">
{% for donator in site.data.donators.ScalaIO2017 %}
  <li>{{donator.name}} <span class="details"> 
    <a href="http://twitter.com/{{donator.twitter}}"><i class="fab fa-twitter"></i></a>
    <span class="company">{{donator.company}}</span>
  </li>
{% endfor %}
</ul>

Scala.IO 2016
===============

<ul class="donators">
{% for donator in site.data.donators.ScalaIO2016 %}
  <li>{{donator.name}} <span class="details">
    <a href="http://twitter.com/{{donator.twitter}}"><i class="fab fa-twitter"></i></a>
    <span class="company">{{donator.company}}</span>
    </span>
  </li>
{% endfor %}
</ul>

Scala.IO 2014
===============

<ul class="donators">
{% for donator in site.data.donators.ScalaIO2014 %}
  <li>{{donator.name}} <span class="details">
    <a href="http://twitter.com/{{donator.twitter}}"><i class="fab fa-twitter"></i></a>
    <span class="company">{{donator.company}}</span>
    </span>
  </li>
{% endfor %}
</ul>
