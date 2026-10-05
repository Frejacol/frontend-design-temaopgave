# Refleksion – Figma til kode

**Gruppemedlemmer:** Freja Colsted og Nanna Dufour

## Indledning

I denne opgave har vi arbejdet med Astro og komponenter, samt defensiv CSS og HTML struktur. Vi startede ud med at danne os et overblik i Trello over, hvad der kunne laves til et komponent og hvad der hørte sammen i opgaven. På den måde var det nemmere for os at danne os et overblik, hvad vi hvad især skulle lave uden at danne konflikter med Git.

Opgaven gik ud på at opbygge en hjemmeside udfra en Figma prototype og gør den responsiv, samt arbejde med defensiv CSS. Denne proces har givet os mere erfaring inden for Astro og hvilke fordele det har til ens arbejdsproces med kodning.

## Proces & Struktur

I vores proces har vi arbejdet med Git og branches, så vi har kunne arbejde individuelt, samt haft en forståelse for, hvad den anden har siddet med. Det har virket godt, fordi vi har kunne arbejde med de forskellige komponenter uden at det konflikter med hinandens arbejde.

Vi har haft meget fokus på at arbejde komponentbaseret med Astro, som både har været ulempe og en fordel. Det har været svært fordi vi har skulle sætte os ind i at kode i Astro, hvor vi har været vant til at kode i Vanilla. Derudover har det også kunne forsinke processen lidt, da vi overtænkte det meget, hvad der var komponenter og hvad vi kunne skrive ind statisk.

Men selvom vi har haft nogle udfordringer med denne del, har vi også tydeligt kunne se fordelene i det, da vi efter at have kodet et par komponenter, nemt har kunne genbruge dem og har optimeret processen uden at gentage eller "dobbeltarbejde".

Til sidst har vi valgt at arbejde med layers, hvor vi har brugt laget "component", som værende det næst mest styrende lag. Vi lavede laget "overrule" som det mest styrende, så vi havde muligheden for at overskrive, hvis der var noget vigtigt der skulle slå igennem.

Denne tilgang brugte vi så vi helt konkret, kunne styre hvilke css regler der ville bestemme. Vi oplevede også at det faktisk løste mange af vores problemer, ved at tilføje "component" laget til vores styles, så der ikke var nogle css regler fra øvrige style sheets der gik ind og lavede problemer.

Mappestruktur var også en vigtig del af vores proces, da vi gjorde meget ud af at kunne finde rundt i projektet og at tingene var delt op. Især når vi også var to der arbejde på samme projekt, gjorde det det nemt for os at kunne bruge og se hinandens arbejde, samt forbereder det os på næste tema, hvor mappestruktur er KEY.

Vores struktur var at dele komponenter og sektioner op i hver deres mappe, for at de ikke blev blandet og vi nemmere kunne overskue, hvad der var hvad, samt rækkefølgen der ligger i at arbejde med Astro, altså at arbejde med komponent -> Sektioner -> Page.

## Udfordringer

### Button Komponent

Et af de første “problemer” vi oplevede var, da knap komponenten skulle laves. Vi havde svært ved at gennemskue, hvordan man fik importeret pil ikonet ind i knappen, da en prop bliver til en string. Vi fandt ud af at hvis man tilføjede `<slot />`, så ville det gøre “pladsen” inde i et element mere fleksibel for, hvad der kan stå, fremfor at definere det meget konkret, til at det kun er tekst der kan sættes ind.

Før

```html
<a href="#" class="{variant}">{text}</a>
```

Efter

```html
<a href="#" class="{variant}"><slot /></a>
```

Det er måske en meget lille ting, men det gjorde at vi forstod slot-elementets funktion bedre, og hvornår/hvorfor det er smart at bruge.

### Hero - forside

Det har især været udfordrende at få sat heroen op, da der var mange elementer som skulle tale sammen og ligge ovenpå hinanden. At få griddet sat op tog også lidt tid, da strukturen skulle tænkes igennem og der var flere ting der blev overset i forløbet. Bl.a. havde det drillet at hero-background slut div sad udenom hero-content, hvilket skabte forskydninger i resultatet.

```html
<div class="hero-background"></div>
<div class="hero-content"></div>
```

Derudover så kunne vi ikke få billedet til at zoome mere ind på hero, da kvinden egentlig er tættere på i prototypen. Vi prøvede at bruge:

```css
transform: scale();
```

Men det resulterede i at billedet så kom udenfor sin valgte position i griddet, så vi besluttede for at gå med at billedet ikke var zoomet ind men sad ordentligt i griddet.

### Doughnut chart - Kompatibilitet på browsere

De udfordringer som vi stødte på med Doughnut chart var bl.a. at vi skulle lave den kompatibel med browsere som ikke understøttede cx, cy og attr(). Efter at have fulgt med i undervisningen og ved hjælp af AI, kom vi frem til at cx, cy og r skulle defineres i HTML'en, samt attributterne som vi ikke kunne bruge i CSS'en.

```html
<figure data-value="{figNumber}" style="{`--value:" ${figNumber}`}>
  <svg viewBox="0 0 100 100">
    <circle class="track" cx="50" cy="50" r="46"></circle>
    <circle class="progress" cx="50" cy="50" r="46" pathLength="100"></circle>
    <g class="marker-group">
      <circle class="marker" cx="96" cy="50" r="5"></circle>
    </g>
  </svg>
  <span class="value">
    <span class="sr-only">{figNumber}%</span>
  </span>
  <figcaption>{figText}</figcaption>
</figure>
```

Det tog lidt tid og derfor var vi nødt til at bruge AI, for at finde en løsning.

### Login Popover

Da login popoveren skulle styles stødte vi også ind i nogle problemer, pga vi først havde brugt `[popover]:open`, hvilket resulteret i at stylesene ikke kom på popoveren. Vi fiksede det ved at fjerne open, fordi open er en pseudo-klasse og derfor kun virker på specfikke HTML tags. Vi kunne også have skrevet `[popover]:popover-open`, da det ville ramme den specifikke popover.

```css
[popover] {
  position-area: bottom span-left;
  margin: 0;
  margin-top: var(--space-4);
  inset: auto;
  overflow: visible;
  padding: var(--space-6);
  border: none;
  border-radius: var(--border-card);
  background-color: var(--color-surface-secondary);
  color: var(--color-text);
  box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 0.2);
}
```

### :Global()

Vi oplevede en del gange i vores proces at når vi stylede på et specifikt komponent, hvor elementet ikke ligger direkte i komponentet, så ville stylen slå igennem. Dette fiksede vi ved at bruge astros element `:global()`. Årsagen var, at Astro scoper stylesheets pr. fil ved at tilføje et skjult data-astro-cid-attribut. Her er der et eksempel på, hvor vi har brugt det:

```css
#scroller {
  grid-column: full;
  margin-top: var(--space-8);
  align-items: start;
  display: flex;
  gap: 1rlh;
  scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-inline: max(1rem, 50% - 1200px / 2);
  scroll-padding-inline: max(1rem, 50% - 1200px / 2);
  > :global(*) {
    scroll-snap-align: start;
    flex: 0 0 min(90%, 400px);
  }
}
```

Her skulle vi bruge det for at style på de cards der er i scrolleren for at de kunne "snappe" til et specifikt punkt i slideren. Så her går `:global(*)` ind og vælger alle elementer som er "child" af #scroller, hvilket er vores card komponent.

## Benspænd

### Container Queries - Team Card

Da vi arbejdede med team cardsene skulle de have et titlecard på billedet når de er store, og stå under deres navne når de har mindre plads. Til denne funktion tænkte vi at container queries var oplagt, da man netop styler udfra den specifikke containers plads fremfor skærmstørrelse.

Her går vi ind og sætter en bestemt bredde på containeren, så den ved hvornår den skal bruge hvilken style (altså hvornår der skal være titel på billedet og hvornår den skal være under navnet).

Vi har sat en bestemt bredde på containeren, vi har valgt præcis disse tal: `(280px <= width < 480px)`, fordi badgen skal kun være på når containeren er smal.

```css
@container (280px <= width < 480px) {
  .title--badge {
    display: block;
    position: absolute;
    right: 1.5ex;
    bottom: 1.5ex;
    padding: 0.5ex 1ex;
    border-radius: 2rem;
    background: var(--color-ui-primary);
    color: var(--color-on-ui-primary);
  }

  .title--inline {
    display: none;
  }
}
```

### FAQ - Animation og setup

På vores about side skulle der sættes en FAQ op. Den er lavet med en `<summary>` og `<details>`. Det er gjort for at få den her "accordian" effekt, så man kan åbne og lukke svarene på spørgsmålene. FAQ'en har også fået en animation med `interpolate-size: allow-keywords;`, hvilket gør at FAQ'en åbner mere smooth.

Da alle browsere ikke understøtter denne funktion har vi brugt `@supports(interpolate-size: allow-keywords)`, som gør at hvis en browsere understøtter, så bliver den kode brugt. Men hvis den ikke understøtter, så åbner den som normalt.

```css
@supports (interpolate-size: allow-keywords) {
  @media (prefers-reduced-motion: no-preference) {
    details {
      interpolate-size: allow-keywords;
    }

    details::details-content {
      block-size: 0;
      overflow: clip;
      transition:
        block-size 0.3s ease,
        content-visibility 0.3s;
      transition-behavior: allow-discrete;
    }

    details[open]::details-content {
      block-size: auto;
    }
  }
}
```

## Brug af AI

Vi har gjort brug af AI til at problemløse når vi har siddet fast i vores kodning. Der har den været super god at pointere, hvor i koden der er fejl og hvorfor. Derudover har vi også brugt det, hvis vi har været i tvivl om, hvordan man bruger en bestemt regel/metode til at få det til at fungere. Så har den forklaret det til vores kontekst.

## Konklusion - Om projektet

Denne opgave har givet en overordnet og bedre forståelse for hvorfor Astro er optimerende og en virkelig smart måde at have et mere overskueligt workflow i ens kodning. Vi har fået en fornemmelse for, hvorfor det er bedre at kigge på opsætningen af en hjemmeside i komponenter fremfor sider.

Derudover var der en af os som ikke havde erfaring før med Git og brug af Branches, så det har også være en god mulighed for at få det mere under huden.

Opgaven har indebåret rigtig mange løsninger som vi kunne finde fra undervisningen, og det var en rigtig god måde at få prøvet dem af i praksis og få en bedre forståelse for, hvordan og hvorfor de fungerer og er en optimal og god løsning til defensive css og browseroptimering.

## Konklusion - Om samarbejdet

Vores samarbejde har fungeret rigtig godt, da vi har meget samme tilgang og ambitionsniveau ift hvad vi ville have ud af denne opgave. Vi har været gode til at kommunikere og opdele opgaver i mellem os, men også sidde sammen til vejledning og sidde med de svære ting sammen, for at få flere øjne på det.

Derfor synes vi også at vi kommet godt i mål, da vi har ønsket at nå det meste, for netop at kunne prøve de ting vi har lært af. Der er selvfølgelig nogle ting vi ikke er kommet i mål med, men da vi har snakket om fra starten af, hvor prioteter lå, er vi tilfredse med resultatet vi er kommet frem til.
