const onload = () => {
  const findMatchingElement = (container1, container2, targetElement) => {
    if (container1 === targetElement) {
      return container2;
    }

    const children1 = Array.from(container1.children);
    const children2 = Array.from(container1.children);

    for (let i = 0; i < children1.length; i++) {
      if (children1[i] && children2[i]) {
        const result = findMatchingElement(
          children1[i],
          children2[i],
          targetElement
        );

        if (result) {
          return result;
        }
      }
      return null;
    }
  };

  console.log(
    findMatchingElement(
      document.getElementById("container1"),
      document.getElementById("container2"),
      document.getElementById("span-id-2")
    )
  );
};

document.addEventListener("DOMContentLoaded", onload);
