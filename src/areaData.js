let areaNames = [
    'right-arm-L',
    'right-arm-B',
    'right-arm-R',
    'right-arm-F',
    'left-arm-L',
    'left-arm-B',
    'left-arm-R',
    'left-arm-F',
  ]
  let areas = [];

  for(let i = 0; i < areaNames.length; i++) {
    let offset = i > 3 ? 44 : 19; 
    let name = areaNames[i]
    areas.push({
      name:name,
      left: 66*i+offset, 
      top: 355, 
      width:64, 
      height:128
    })
  }
  
  areas = areas.concat([
    {
      name: 'DOWN',
      left:231,
      top:204, 
      width:128, 
      height:64
    },
    {
      name: 'UP',
      left:231,
      top:8, 
      width:128, 
      height:64
    },
    {
      name: 'FRONT',
      left:231,
      top:74, 
      width:128, 
      height:128
    },
    {
      name: 'BACK',
      left:427,
      top:74, 
      width:128, 
      height:128
    },
    {
      name: 'R',
      left:165,
      top:74, 
      width:64, 
      height:128
    },
    {
      name: 'L',
      left:361,
      top:74, 
      width:64, 
      height:128
    }
  ])

  export default areas;