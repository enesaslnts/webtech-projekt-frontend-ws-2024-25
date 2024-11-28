<template>
  <!-- Logo und Haupttitel der App -->
  <img alt="Logo" src="./assets/FitnessLogo.png" class="logo">

  <div id="app">
    <!-- Hauptüberschrift für den Bereich "Trainingspläne" -->
    <h1>Trainingspläne</h1>
    <h2>Dein perfekter Trainingsplan, um deine Performance zu steigern!</h2>

    <!-- Einfügen der PlanList-Komponente, die die Planerstellung und -anzeige übernimmt -->
    <PlanList />
  </div>
</template>

<script>
// Import der PlanList-Komponente
import PlanList from './components/PlanList.vue';

export default {
  name: 'App', // Name der Hauptkomponente
  components: {
    PlanList // Einbinden der PlanList-Komponente
  }
};
</script>

<style>
/* Gesamtes App-Layout-Styling */
#app {
  text-align: center; /* Zentriert den gesamten Inhalt */
  font-family: 'Arial', sans-serif; /* Definiert eine klare, gut lesbare Schriftart */
  color: #333; /* Setzt die Hauptfarbe des Textes auf ein dunkles Grau */
  margin-top: 20px; /* Abstand nach oben */
}

/* Logo-Styling */
.logo {
  display: block; /* Block-Darstellung für das Logo */
  margin: 0 auto; /* Zentriert das Logo horizontal */
  width: 120px; /* Setzt die Breite des Logos */
  height: auto; /* Beibehaltung des Seitenverhältnisses */
  border-radius: 50%; /* Rundes Design für das Logo */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Leichter Schatten für Tiefe */
  margin-bottom: 20px; /* Abstand zum darunterliegenden Inhalt */
}

/* Hauptüberschrift für den Titel "Trainingspläne" */
h1 {
  font-size: 2.5rem; /* Große Schriftgröße */
  font-weight: bold; /* Fettdruck für Wichtigkeit */
  color: #ff4d4d; /* Auffällige Farbe passend zur Fitness-Thematik */
  margin-bottom: 10px; /* Abstand nach unten */
}

/* Untertitel für eine Beschreibung unterhalb des Haupttitels */
h2 {
  font-size: 1.25rem; /* Etwas kleinere Schriftgröße als die Hauptüberschrift */
  color: #666; /* Dezente graue Farbe */
  font-weight: 300; /* Leichtes Schriftgewicht für weniger Dominanz */
  margin-bottom: 30px; /* Abstand zum Hauptinhalt */
}

/* Hintergrund-Styling */
body {
  background-color: #f7f7f7; /* Setzt einen hellgrauen Hintergrund für eine freundliche Optik */
}

/* Für responsives Design: Optimierung für kleinere Bildschirme */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem; /* Anpassung der Schriftgröße auf kleinen Bildschirmen */
  }

  h2 {
    font-size: 1rem; /* Kleinere Untertitelgröße für mobile Ansicht */
  }

  .logo {
    width: 100px; /* Verkleinert das Logo auf kleinen Bildschirmen */
  }
}
</style>
