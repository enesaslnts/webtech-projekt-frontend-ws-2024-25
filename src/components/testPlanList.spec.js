import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import PlanList from "@/components/PlanList.vue";

// Mock Axios
vi.mock("axios");

describe("PlanList.vue", () => {
  it("zeigt eine Nachricht an, wenn keine Pläne vorhanden sind", async () => {
    // Mock leere Antwort
    axios.get.mockResolvedValue({ data: [] });

    const wrapper = mount(PlanList);
    await flushPromises(); // Warten, bis alle Promises aufgelöst sind

    expect(wrapper.text()).toContain("Keine Trainingspläne vorhanden.");
  });

  it("zeigt eine Liste gespeicherter Pläne an, wenn Pläne vorhanden sind", async () => {
    // Mock Plandaten
    const plans = [
      {
        planId: 1,
        planName: "Plan 1",
        workoutDays: [{ workoutDayName: "Montag", restDay: true, exercises: [] }],
      },
    ];
    axios.get.mockResolvedValue({ data: plans });

    const wrapper = mount(PlanList);
    await flushPromises(); // Warten, bis alle Promises aufgelöst sind

    expect(wrapper.text()).toContain("Plan 1");
    expect(wrapper.text()).toContain("Montag");
    expect(wrapper.text()).toContain("Rest Day");
  });

  it("fügt eine Übung zur Liste der Übungen hinzu", async () => {
    axios.get.mockResolvedValue({ data: [] });

    const wrapper = mount(PlanList);
    await flushPromises(); // Warten, bis alle Promises aufgelöst sind

    await wrapper.setData({
      selectedDay: "Montag",
      newExerciseName: "Push Up",
      newExerciseSets: 3,
      newExerciseReps: 15,
    });

    await wrapper.find(".add-exercise-button").trigger("click");

    expect(wrapper.vm.newExercises).toHaveLength(1);
    expect(wrapper.vm.newExercises[0]).toMatchObject({
      workoutDayName: "Montag",
      isRestDay: false,
      exercises: [
        { exerciseName: "Push Up", exerciseSets: 3, exerciseReps: 15 },
      ],
    });
  });

  it("fügt einen Rest Day zur Liste der Übungen hinzu", async () => {
    axios.get.mockResolvedValue({ data: [] });

    const wrapper = mount(PlanList);
    await flushPromises();

    await wrapper.setData({
      selectedDay: "Montag",
      isRestDay: true,
    });

    await wrapper.find(".add-exercise-button").trigger("click");

    expect(wrapper.vm.newExercises).toHaveLength(1);
    expect(wrapper.vm.newExercises[0]).toMatchObject({
      workoutDayName: "Montag",
      isRestDay: true,
      exercises: [],
    });
  });

  it("löscht eine Übung aus der Liste der Übungen", async () => {
    axios.get.mockResolvedValue({ data: [] });

    const wrapper = mount(PlanList);
    await flushPromises();

    await wrapper.setData({
      newExercises: [
        {
          workoutDayName: "Montag",
          isRestDay: false,
          exercises: [
            { exerciseName: "Push Up", exerciseSets: 3, exerciseReps: 15 },
          ],
        },
      ],
    });

    await wrapper.find(".remove-button").trigger("click");

    expect(wrapper.vm.newExercises).toHaveLength(0);
  });

  it("sendet einen neuen Plan an das Backend", async () => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({
      data: { planId: 2, planName: "Neuer Plan", workoutDays: [] },
    });

    const wrapper = mount(PlanList);
    await flushPromises();

    await wrapper.setData({
      newPlanName: "Neuer Plan",
      newExercises: [
        { workoutDayName: "Montag", isRestDay: true, exercises: [] },
      ],
    });

    await wrapper.find(".add-plan-button").trigger("click");

    expect(axios.post).toHaveBeenCalled(); // Überprüfen, ob die POST-Anfrage gesendet wurde
    expect(wrapper.vm.plans).toHaveLength(1); // Überprüfen, ob der Plan hinzugefügt wurde
    expect(wrapper.vm.plans[0]).toMatchObject({ planName: "Neuer Plan" });
  });

  it("löscht einen Plan aus der Liste und vom Backend", async () => {
    axios.get.mockResolvedValue({
      data: [
        { planId: 1, planName: "Plan 1", workoutDays: [] },
      ],
    });
    axios.delete.mockResolvedValue();

    const wrapper = mount(PlanList);
    await flushPromises();

    await wrapper.find(".remove-button").trigger("click");

    expect(axios.delete).toHaveBeenCalledWith(
      "https://webtech-projekt-backend-ws-2024-25.onrender.com/api/plans/1"
    );
    expect(wrapper.vm.plans).toHaveLength(0);
  });

  it("zeigt eine Warnung, wenn keine Übungen oder Planname hinzugefügt wurden", async () => {
    axios.get.mockResolvedValue({ data: [] });

    const wrapper = mount(PlanList);
    await flushPromises();

    global.alert = vi.fn();

    await wrapper.find(".add-plan-button").trigger("click");

    expect(global.alert).toHaveBeenCalledWith(
      "Bitte einen Namen für den Plan eingeben und mindestens einen Tag hinzufügen!"
    );
  });
});
