<template>
  <div>
    <!-- Wenn keine Trainingspläne vorhanden sind (leere Liste), wird dieser Text angezeigt -->
    <div v-if="plans.length === 0">
      Keine Trainingspläne vorhanden.
    </div>
    
    <!-- Wenn es Trainingspläne gibt, wird diese Liste angezeigt -->
    <ul v-else>
      <!-- v-for Schleife: Durchläuft jeden Plan in der plans-Liste -->
      <li v-for="plan in plans" :key="plan.id">
        <!-- Zeigt den Namen und die Beschreibung jedes Plans an -->
        <h2>{{ plan.name }}</h2>
        <p> {{ plan.description }} </p>

        <ul>
          <!-- Trainingstage durchlaufen -->
          <li v-for="day in plan.days" :key="day.day">
          <!-- Wenn es ein Rest-Day ist -->
            <div v-if="day.restDay">
            {{ day.day }}: Rest-Day
            </div>
              <!-- Wenn es ein Trainingstag ist -->
              <div v-else>
              {{ day.day }}:
                <ul>
                  <li v-for="exercise in day.workout" :key="exercise.exercise">
                    {{ exercise.exercise }}: {{ exercise.sets }} Sätze, {{ exercise.reps }} Wiederholungen 
                    <span v-if="exercise.time">, {{ exercise.time }}</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</template>
  
  <script>
  import axios from 'axios'; // Axios wird verwendet, um HTTP-Anfragen zu stellen (an Backend)
  
  export default {
    name: 'PlanList', // Name der Komponente
    
    data() {
      return {
        plans: [] // Hier werden die Trainingspläne gespeichert, die vom Backend kommen
      };
    },
    
    // Diese Methode wird aufgerufen, sobald die Komponente in die Webseite geladen wird
    mounted() {
      // HTTP-Anfrage an das Backend (Spring Boot) zum Abrufen der Trainingspläne
      axios.get('https://webtech-projekt-backend-ws-2024-25.onrender.com/api/plans') // URL meiner API
        .then(response => {
          // Wenn die Anfrage erfolgreich war, speichere die Antwortdaten (Trainingspläne) in "plans"
          console.log(response.data);  //Daten in der Konsole anzeigen
          this.plans = response.data;
        })
        .catch(error => {
          // Wenn ein Fehler auftritt, wird er hier in der Konsole angezeigt
          console.error("Fehler beim Laden der Trainingspläne:", error);
        });
    }
  };
  </script>
  
  <style scoped>
  /* Styling für die Liste der Trainingspläne */
  ul {
    list-style-type: none; /* Entfernt die Standard-Aufzählungspunkte der Liste */
    padding: 0; /* Entfernt den Standard-Rand der Liste */
  }
  
  li {
    padding: 10px; /* Fügt einen Innenabstand für jedes Listenelement hinzu */
    margin: 5px; /* Fügt einen kleinen Außenabstand zwischen den Elementen hinzu */
    background-color: #f0f0f0; /* Hellt den Hintergrund jedes Listenelements auf */
  }
  </style>
  