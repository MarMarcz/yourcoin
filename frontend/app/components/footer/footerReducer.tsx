// app/components/footer/footerReducer.ts
interface FooterState {
    text: string;
  }
  
  const initialState: FooterState = {
    text: 'It\'s Magic Footer',
  };
  
  const footerReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_FOOTER_TEXT':
        return {
          ...state,
          text: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default footerReducer;
  