---
layout: default
title: Partners
---
<div class="speakers">
<h1>Scala.IO 2014</h1>
{% for donator in site.data.donators.ScalaIO2014 %}
<div class="row">
  <div class="speaker_bio">
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
