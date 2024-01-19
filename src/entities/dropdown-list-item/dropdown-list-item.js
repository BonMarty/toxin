export default function handleDropdownListItem(dropdownList) {
  // Define array with all quantity values from dropdown list
  const quantities = [];

  const dropdownListItemQuantities = dropdownList.querySelectorAll(
    '.js-dropdown-list-item__quantity',
  );

  const dropdownHeaderDefaultValue =
    dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML;

  // Define dropdown variant (furniture or guest)
  const dropdownVariant = dropdownList.offsetParent.classList.contains('js-dropdown_furniture')
    ? 'furniture'
    : 'guest';

  dropdownListItemQuantities.forEach((item, index) => {
    const decrementButton = item.childNodes[0];
    let quantityValue = item.childNodes[1];
    const incrementButton = item.childNodes[2];

    // Push quantities to array
    quantities.push(Number(quantityValue.innerHTML));

    decrementButton.addEventListener('click', (event) => {
      let value = Number(quantityValue.innerHTML);
      if (value > 0) {
        // Change value in quantities array
        quantities[index] = value - 1;

        // Change value in user interface
        quantityValue.innerHTML = value - 1;

        if (dropdownVariant === 'guest') {
          // Define reduced value that will be passed to the renderQuantity function
          const reducedValue = quantities.reduce((accum, quantity) => {
            return (accum += quantity);
          }, 0);

          if (reducedValue === 0) {
            dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
              dropdownHeaderDefaultValue;
          } else {
            import('./lib/getCorrectWord').then((module) => {
              // Set dropdown header title to reduced value quantity with correct word
              dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
                reducedValue + ' ' + module.default(reducedValue, 'guest');
            });
          }
        }

        if (dropdownVariant === 'furniture') {
          const bedroomQuantity = Number(
            dropdownList.childNodes[0].childNodes[1].childNodes[1].innerHTML,
          );
          const bedQuantity = Number(
            dropdownList.childNodes[1].childNodes[1].childNodes[1].innerHTML,
          );
          const bathroomQuantity = Number(
            dropdownList.childNodes[2].childNodes[1].childNodes[1].innerHTML,
          );

          const furniture = [];

          import('./lib/getCorrectWord').then((module) => {
            const bedroomTitle =
              bedroomQuantity > 0
                ? bedroomQuantity + ' ' + module.default(bedroomQuantity, 'bedroom')
                : '';
            const bedTitle =
              bedQuantity > 0 ? bedQuantity + ' ' + module.default(bedQuantity, 'bed') : '';
            const bathroomTitle =
              bathroomQuantity > 0
                ? bathroomQuantity + ' ' + module.default(bathroomQuantity, 'bathroom')
                : '';

            if (bedroomQuantity > 0) {
              furniture.push(bedroomTitle);
            }
            if (bedQuantity > 0) {
              furniture.push(bedTitle);
            }

            if (bathroomQuantity > 0) {
              furniture.push(bathroomTitle);
            }

            if (bedroomQuantity === 0 && bedQuantity === 0 && bathroomQuantity === 0) {
              dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
                dropdownHeaderDefaultValue;
            } else {
              dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
                furniture.join(', ');
            }
          });
        }
      }
    });

    incrementButton.addEventListener('click', (event) => {
      let value = Number(quantityValue.innerHTML);

      // Change value in quantities array
      quantities[index] = value + 1;

      // Change value in user interface
      quantityValue.innerHTML = value + 1;

      if (dropdownVariant === 'guest') {
        // Define reduced value that will be passed to the renderQuantity function
        const reducedValue = quantities.reduce((accum, quantity) => {
          return (accum += quantity);
        }, 0);

        if (reducedValue === 0) {
          dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
            dropdownHeaderDefaultValue;
        } else {
          import('./lib/getCorrectWord').then((module) => {
            // Set dropdown header title to reduced value quantity with correct word
            dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
              reducedValue + ' ' + module.default(reducedValue, 'guest');
          });
        }
      }
      if (dropdownVariant === 'furniture') {
        const bedroomQuantity = Number(
          dropdownList.childNodes[0].childNodes[1].childNodes[1].innerHTML,
        );
        const bedQuantity = Number(
          dropdownList.childNodes[1].childNodes[1].childNodes[1].innerHTML,
        );
        const bathroomQuantity = Number(
          dropdownList.childNodes[2].childNodes[1].childNodes[1].innerHTML,
        );

        const furniture = [];

        import('./lib/getCorrectWord').then((module) => {
          const bedroomTitle =
            bedroomQuantity > 0
              ? bedroomQuantity + ' ' + module.default(bedroomQuantity, 'bedroom')
              : '';
          const bedTitle =
            bedQuantity > 0 ? bedQuantity + ' ' + module.default(bedQuantity, 'bed') : '';
          const bathroomTitle =
            bathroomQuantity > 0
              ? bathroomQuantity + ' ' + module.default(bathroomQuantity, 'bathroom')
              : '';

          if (bedroomQuantity > 0) {
            furniture.push(bedroomTitle);
          }
          if (bedQuantity > 0) {
            furniture.push(bedTitle);
          }

          if (bathroomQuantity > 0) {
            furniture.push(bathroomTitle);
          }

          if (bedroomQuantity === 0 && bedQuantity === 0 && bathroomQuantity === 0) {
            dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML =
              dropdownHeaderDefaultValue;
          } else {
            dropdownList.offsetParent.childNodes[1].childNodes[0].innerHTML = furniture.join(', ');
          }
        });
      }
    });
  });
}
