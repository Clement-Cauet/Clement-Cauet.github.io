---
layout: page
title: Mon parcours
description: "Ceci est un exemple de CV que vous pouvez générer par vous-même"
menubar: menu_bar
---

## Formation 

{% for education in site.data.resume.education %}
`{{ education.startDate | date: "%Y" }} – {{ education.endDate | date: "%Y" }}`
**{{ education.institution }}**
- {{ education.studyType }} en {{ education.area }}
{% if education.courses %}
  * Cours : {% for course in education.courses %}{{ course }}{% if forloop.last == false %}, {% endif %}{% endfor %}
{% endif %}
{% endfor %}

## Expériences

{% for work in site.data.resume.work %}
`{{ work.startDate | date: "%Y" }} – {{ work.endDate | date: "%Y" }}`
**{{ work.name }}** - {{ work.position }}
- {{ work.summary }}
{% if work.highlights %}
  {% for highlight in work.highlights %}
  * {{ highlight }}
  {% endfor %}
{% endif %}
{% endfor %}

{% for volunteer in site.data.resume.volunteer %}
`{{ volunteer.startDate | date: "%Y" }} – {{ volunteer.endDate | date: "%Y" }}`
**{{ volunteer.organization }}** - {{ volunteer.position }}
- {{ volunteer.summary }}
{% if volunteer.highlights %}
  {% for highlight in volunteer.highlights %}
  * {{ highlight }}
  {% endfor %}
{% endif %}
{% endfor %}

## Compétences

### Langues
{% for language in site.data.resume.languages %}
- {{ language.language }} : {{ language.fluency }}
{% endfor %}

### Informatique
{% for skill in site.data.resume.skills %}
- {{ skill.name }} : {% for keyword in skill.keywords %}{{ keyword }}{% if forloop.last == false %}, {% endif %}{% endfor %}
{% endfor %}

## Centres d’intérêt

{% for interest in site.data.resume.interests %}
### {{ interest.name }}
{% for keyword in interest.keywords %}
- {{ keyword }}
{% endfor %}
{% endfor %}

## Références

{% for reference in site.data.resume.references %}
- {{ reference.name }} : {{ reference.reference }}
{% endfor %}
