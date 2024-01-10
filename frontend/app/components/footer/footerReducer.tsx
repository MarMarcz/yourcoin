// app/components/footer/footerReducer.ts
interface FooterState {
    text: string;
  }
  
  const initialState: FooterState = {
    text: 'To jest stopka!',
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
  