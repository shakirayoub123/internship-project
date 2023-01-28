// import {mount} from '@vue/test-utils'
// import {createStore} from "vuex";
// import homePage from "@/components/HomePage.vue"
//
// test('global', async () => {
//     const store = createStore()
//     const wrapper = mount(homePage, {
//         global: {
//             plugins: [store]
//         }
//     })
//     it('ItemsTodo be mounted', () => {
//
//         expect(wrapper.exists()).toBeTruthy()
//
//     })
//
// })


import {mount, shallowMount} from "@vue/test-utils"
import moxios from 'moxios'
import Header from "@/components/Header.vue";
import HomePage from "@/components/HomePage.vue";
import notFound from "@/components/notFound.vue";
import axios from "axios";
import Sidebar from "@/dashboard/Sidebar.vue";
import {equal} from "assert";
import {flushPromises} from "@vue/test-utils";
import store from "@/store";
import sinon from "sinon";
import Navbar from "@/dashboard/Navbar.vue";

const {

    createRouterMock,

    injectRouterMock

} = require('vue-router-mock')
describe("HomePage.Vue", () => {

    const router = createRouterMock({})

    beforeEach(() => {

        injectRouterMock(router)

    })

    let wrapper;

    const mockRouter = {

        push: jest.fn()

    }
    const updateWrapper = () => {

        wrapper = mount(HomePage, {

            data() {
                return {
                    loading: true,
                }
            },
            computed: {

                users: jest.fn(),

                displayedPosts: jest.fn(),

            },
            created: jest.fn(),


            global: {

                mocks: {

                    $router: mockRouter,
                    stubs: ['paginate'],

                }
            },
            router
        })

    }
    test("rendering AdminLte Sidebar", () => {
        const wrapper = shallowMount(Sidebar)
        expect(wrapper.findComponent(Sidebar).exists()).toBe(true)

    })
    test("rendering AdminLte Navbar", () => {
        const wrapper = shallowMount(Navbar)
        expect(wrapper.findComponent(Navbar).exists()).toBe(true)

    })
    test('render header', () => {
        const wrapper = shallowMount(Header)
        expect(wrapper.findComponent(Header).exists()).toBe(true)
    })
    test('render notFound', () => {
        const wrapper = shallowMount(notFound)
        expect(wrapper.findComponent(notFound).exists()).toBe(true)
    })

    beforeEach(function () {

        updateWrapper();

        moxios.install();

    })

    afterEach(function () {

        moxios.uninstall()

    })

    it('ItemsTodo be mounted', () => {

        expect(wrapper.exists()).toBeTruthy()

    })
    test('testing for the getData', async()=> {

        moxios.withMock( ()=> {

            wrapper = sinon.spy()

            axios.get('http://localhost:3000/todolist/').then(wrapper)

            moxios.wait(()=> {

                let request = moxios.requests.mostRecent()

                request.respondWith({

                    status: 200,

                    response: {

                        id: 1,  title: 'title1',

                    }

                })

                    .then(()=> {

                        equal(wrapper.called, true)
                    })

            })

        })

    })
    // test('delete `button` functionality',async()=>{
    //
    //     const id = 1
    //
    //     wrapper.vm.$deleteTodo()
    //
    //     expect(wrapper.html()).toContain("content")
    //
    //     await wrapper.find(".btn").trigger("click")
    //
    //     await flushPromises()
    //
    //     await expect(wrapper.exists(id)).toBe(true);
    //
    //     expect(wrapper.html()).toContain("")
    //
    // })


})