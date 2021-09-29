import CalculoValeTransporteMixin from "../../../src/mixins/CalculoValeTransporteMixin";
import { shallowMount, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

const getComponentStructure = () => ({
  sync: false,  
  data() {
    return {
      salarioBruto: 2000
    };
  },
  localVue,  
});

describe("CalculoValeTransporteMixin", () => {
  let wrapper = null;
  let vm = null;

  beforeEach(() => {
    wrapper = shallowMount(
      {
        template: '<div></div>',
        ...CalculoValeTransporteMixin,
      },
      getComponentStructure(),
    );
    vm = wrapper.vm;
  });
  describe("computed", () => {        
    describe("totalValeTransporte", () => {
      it("Deve retornar o valor do VT que corresponde a 6% do salario bruto", () => {
        const calculo = vm.totalValeTransporte;        
        console.log(calculo);
        expect(calculo).toEqual(120);      
      });
    });     
  });  
});
