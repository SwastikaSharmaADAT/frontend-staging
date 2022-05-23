export const mapToTree = (data) => {
    let childrenArr = []
    let parentArr = []
  
    data.map((item) => {
      if (item.parentComment) {
        childrenArr.push(item)
      } else {
        const obj = { ...item }
        obj.children = []
        parentArr.push(obj)
      }
      return item
    })
  
    childrenArr.map((child) => {
      const parentObj = parentArr.find((o) => o._id === child.parentComment)
      if (parentObj) {
        const childArr = [...parentObj.children, child]
        let parents = [...parentArr]
  
        parents = parents.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === parentObj._id) {
            cloned.children = childArr
          }
          return cloned
        })
  
        parentArr = parents
      }
      return child
    })
  
    let count = -1
  
    parentArr.map((o) => {
      count = count + 1
      o.startCountFrom = count
      count = count + o.children.length
      return o
    })
  
    return parentArr
  }
  