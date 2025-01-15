---
layout: promo-page
title: Accueil
description: "Ceci est un exemple de resume que vous pouvez générer par vous-même"
menubar: menu_bar
# hero_image:
# hero_image_ratio:
---

# {{ site.data.resume.basics.name }}
{{ site.data.resume.basics.label }}

Disponible {{ site.data.resume.basics.availability | default: "XX mois" }} à partir de {{ site.data.resume.basics.startDate | date: "%d/%m/%Y" }}

[{{ site.data.resume.basics.email }}](mailto:{{ site.data.resume.basics.email }})

{% for profile in site.data.resume.basics.profiles %}
- [{{ profile.network }}]({{ profile.url }})
{% endfor %}