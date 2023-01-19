import { mount } from '@vue/test-utils'
import addTodo from "@/components/addTodo.vue";

test('creates a todo', () => {
        const wrapper = mount(addTodo)
        expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)

        wrapper.get('[data-test="new-todo"]').setValue('New todo')
        wrapper.get('[data-test="form"]').trigger('submit')

        expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
})