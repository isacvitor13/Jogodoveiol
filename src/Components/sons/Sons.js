import som from './keys.wav'

function Sons(i){
    let audio  
      switch(i){
        case 1:
          audio=   new Audio(som).play()
            break;
            default:
                audio=   new Audio(som).play()
                break;
      }

      return audio
}
export default Sons()