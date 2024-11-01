<template>

<img alt="Logo" src="./assets/FitnessLogo.png" class="logo">

<!-- <HelloWorld msg="Your perfect Training Plan to boost your Performance!"/> -->

  <div id="app">
    <!-- Überschrift, die den Bereich "Trainingspläne" beschreibt -->
    <h1>Trainingspläne</h1>
    <h2>Dein perfekter Trainingsplan um deine Performance zu steigern!</h2>

    <!-- Hier wird die PlanList-Komponente eingefügt, die die Liste der Trainingspläne rendert -->
    <PlanList />
  </div>
</template>

<script>
// Importiere die PlanList-Komponente, die wir gerade erstellt haben
import PlanList from './components/PlanList.vue';

export default {
  name: 'App', // Name der Hauptkomponente

  // Wir fügen die PlanList-Komponente in diese Hauptkomponente ein
  components: {
    PlanList
  }
};
</script>

<style>
/* Styling für das Logo */
.logo {
  display: block;
  margin: 0 auto;
  width: 150px; /* Breite des Logos */
  height: 150px; /* Höhe passt sich automatisch an */
  margin-bottom: 20px; /* Abstand unter dem Logo */
}

/* Styling für Header */
h1 {
  text-align: center; /* Zentriert die Überschrift */
  color: #ff4d01; /* Setzt die Farbe der Überschrift auf Grün */
}

/* Styling für den Untertitel */
h2 {
  text-align: center; /* Zentriert den Text */
  color: #0a0000; /* Setzt eine neutrale Schriftfarbe */
  font-size: 1.5em; /* Setzt eine angemessene Schriftgröße */
  margin-bottom: 20px; /* Abstand unter dem Text */
}
</style>


