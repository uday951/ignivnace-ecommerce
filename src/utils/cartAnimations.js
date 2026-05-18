export const flyToCart = (e, imageUrl) => {
  if (!e || !e.clientX) return;

  const startX = e.clientX;
  const startY = e.clientY;

  const cartIcon = document.getElementById('cart-icon-target');
  let endX = window.innerWidth - 50;
  let endY = 50;

  if (cartIcon) {
    const rect = cartIcon.getBoundingClientRect();
    endX = rect.left + rect.width / 2;
    endY = rect.top + rect.height / 2;
  }

  const flyingImg = document.createElement('img');
  flyingImg.src = imageUrl;
  flyingImg.style.position = 'fixed';
  flyingImg.style.left = `${startX}px`;
  flyingImg.style.top = `${startY}px`;
  flyingImg.style.width = '50px';
  flyingImg.style.height = '50px';
  flyingImg.style.objectFit = 'contain';
  flyingImg.style.borderRadius = '50%';
  flyingImg.style.zIndex = '9999';
  flyingImg.style.pointerEvents = 'none';
  flyingImg.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
  flyingImg.style.transform = 'translate(-50%, -50%) scale(1)';
  flyingImg.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
  flyingImg.style.backgroundColor = 'white';

  document.body.appendChild(flyingImg);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      flyingImg.style.left = `${endX}px`;
      flyingImg.style.top = `${endY}px`;
      flyingImg.style.transform = 'translate(-50%, -50%) scale(0.2)';
      flyingImg.style.opacity = '0.5';
    });
  });

  setTimeout(() => {
    flyingImg.remove();
    const bounceEvent = new Event('cart-bounce');
    document.dispatchEvent(bounceEvent);
  }, 600);
};
