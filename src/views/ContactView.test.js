/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ContactView from "./ContactView.vue";

describe("ContactView Test!", () => {
  it("should render", () => {
    const wrapper = mount(ContactView);

    expect(wrapper.find("h1").exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
    expect(wrapper.find("button").exists()).toBeTruthy();
  });

  it("should change value", async () => {
    const wrapper = mount(ContactView);

    await wrapper.find("input[type='text']").setValue("aa");
    await wrapper.find("input[type='email']").setValue("aa@aa.aa");
    await wrapper.find("textarea").setValue("aaaaa");
    await wrapper.find("button").trigger("click");

    expect(wrapper.find("input[type='text']").text()).toEqual("");
    expect(wrapper.find("button").text()).toEqual("");
  });
});
