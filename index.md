---
layout: promo-page
title: Qui suis-je?
description: "Ceci est un exemple de resume que vous pouvez générer par vous-même"
menubar: menu_bar
hero_image: assets/imgs/profile.jpg
hero_image_ratio: is-1by1
---

# {{ site.data.resume.basics.name }}
{{ site.data.resume.basics.label }}

Disponible {{ site.data.resume.basics.availability | default: "XX mois" }} à partir de {{ site.data.resume.basics.startDate | date: "%d/%m/%Y" }}

[{{ site.data.resume.basics.email }}](mailto:{{ site.data.resume.basics.email }})

{% for profile in site.data.resume.basics.profiles %}
- [{{ profile.network }}]({{ profile.url }})
{% endfor %}