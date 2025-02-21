import { View } from 'react-native';

export default function PageLoading() {
  return (
    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1,  width: '100%'}}>
      <View style={{height: 100, width: 100}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#116D6E" stroke="#116D6E" stroke-width="7" r="15" cx="40" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle>
          <circle fill="#116D6E" stroke="#116D6E" stroke-width="7" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle>
          <circle fill="#116D6E" stroke="#116D6E" stroke-width="7" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle>
        </svg>
      </View>
    </View>
  );
}
