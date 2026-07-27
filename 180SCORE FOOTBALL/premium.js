  const plans = document.querySelectorAll('.plan');
  const subscribeBtn = document.getElementById('subscribeBtn');
  let selectedPlan = 'monthly';

  function selectPlan(plan){
    plans.forEach(p => {
      const isSelected = p === plan;
      p.classList.toggle('selected', isSelected);
      p.setAttribute('aria-pressed', isSelected);
    });
    selectedPlan = plan.dataset.plan;
  }

  plans.forEach(plan => {
    plan.addEventListener('click', () => selectPlan(plan));
    plan.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        selectPlan(plan);
      }
    });
  });

  subscribeBtn.addEventListener('click', () => {
    alert('Subscribing to the ' + selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) + ' plan');
  });