import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroSection } from './components/HeroSection';
import { SearchBar } from './components/SearchBar';
import { CuisineSection } from './components/CuisineSection';
import { ReservationCta } from './components/ReservationCta';
import { CollectionsSection } from './components/CollectionsSection';
import { FeaturedRestaurants } from './components/FeaturedRestaurants';
import { ChefSignatures } from './components/ChefSignatures';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DiningCategories } from './components/DiningCategories';
import { OrderTrackerSection } from './components/OrderTrackerSection';
import { OffersSection } from './components/OffersSection';
import { StoriesSection } from './components/StoriesSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

// Full Page Views & Modals
import { ExploreView } from './components/ExploreView';
import { OrdersView } from './components/OrdersView';
import { SavedView } from './components/SavedView';
import { AccountView } from './components/AccountView';
import { ContactSection } from './components/ContactSection';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { ArticleModal } from './components/ArticleModal';
import { StoryVideoModal } from './components/StoryVideoModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

// Mock Data & Types
import {
  MOCK_RESTAURANTS,
  CHEF_SIGNATURE_DISHES,
  RESTAURANT_COLLECTIONS,
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS,
  FOOD_ARTICLES,
} from './data/mockData';
import {
  ActiveTab,
  CuisineType,
  Restaurant,
  MenuItem,
  Order,
  Reservation,
  FoodArticle,
} from './types';

interface CartItem extends MenuItem {
  quantity: number;
}

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType>('All');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');

  // Saved / Favorites state (with localStorage persistence)
  const [savedRestaurantIds, setSavedRestaurantIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dinenest_saved_restaurants');
      return stored ? JSON.parse(stored) : ['ember-and-olive', 'the-garden-table'];
    } catch {
      return ['ember-and-olive', 'the-garden-table'];
    }
  });

  const [savedDishIds, setSavedDishIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dinenest_saved_dishes');
      return stored ? JSON.parse(stored) : ['dish-1', 'dish-3'];
    } catch {
      return ['dish-1', 'dish-3'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dinenest_saved_restaurants', JSON.stringify(savedRestaurantIds));
    } catch (e) {
      // Ignore storage errors in restricted iframes
    }
  }, [savedRestaurantIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dinenest_saved_dishes', JSON.stringify(savedDishIds));
    } catch (e) {
      // Ignore storage errors
    }
  }, [savedDishIds]);

  // Cart / Bag state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'dish-1',
      restaurantId: 'ember-and-olive',
      restaurantName: 'Ember & Olive',
      name: 'Truffle Porcini Risotto',
      category: 'Main Courses',
      description: 'Aged Acquerello carnaroli rice with wild mountain porcini.',
      price: 28,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Orders & Bookings state
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);

  // Modals
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationTargetRestaurant, setReservationTargetRestaurant] = useState<Restaurant | null>(
    null
  );
  const [selectedArticle, setSelectedArticle] = useState<FoodArticle | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Toggle favorite restaurant
  const handleToggleFavoriteRestaurant = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedRestaurantIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from saved restaurants' : 'Saved to your personal shortlist');
      return updated;
    });
  };

  // Toggle favorite dish
  const handleToggleFavoriteDish = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedDishIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from saved dishes' : 'Dish saved to your wishlist');
      return updated;
    });
  };

  // Add to cart
  const handleAddToCart = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added "${item.name}" to your dining bag`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleCheckout = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    setActiveTab('orders');
    showToast(`Order #${newOrder.id} placed! Fresh preparation underway.`);
  };

  // Open reservation modal
  const handleOpenReservation = (restaurant?: Restaurant) => {
    setReservationTargetRestaurant(restaurant || null);
    setIsReservationModalOpen(true);
  };

  const handleConfirmReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
    showToast(`Table confirmed at ${newRes.restaurantName} for ${newRes.guests} guests!`);
  };

  const handleCancelReservation = (resId: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== resId));
    showToast('Reservation cancelled successfully');
  };

  const handleSearchSubmit = () => {
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCuisine = (cuisine: CuisineType) => {
    setSelectedCuisine(cuisine);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRestaurantById = (id: string) => {
    const found = MOCK_RESTAURANTS.find((r) => r.id === id);
    if (found) {
      setSelectedRestaurant(found);
    }
  };

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F1E5] text-[#18202B] font-sans antialiased flex flex-col selection:bg-[#596B27] selection:text-white">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedRestaurantIds.length}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'home' && (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onExploreClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onWatchStoryClick={() => setIsStoryModalOpen(true)}
              onOpenReservation={() => handleOpenReservation()}
            />

            {/* 2. Search Experience */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCuisine={selectedCuisine}
              setSelectedCuisine={setSelectedCuisine}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* 3. Cuisine Discovery ("Find Your Flavor") */}
            <CuisineSection
              selectedCuisine={selectedCuisine}
              onSelectCuisine={handleSelectCuisine}
            />

            {/* 4. Reservation CTA Banner ("Make Tonight Special") */}
            <ReservationCta onOpenReservation={() => handleOpenReservation()} />

            {/* 5. Curated Collections ("Curated Dining Experiences") */}
            <CollectionsSection
              onSelectCollection={(colId) => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewAllCollections={() => {
                setActiveTab('experiences');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. Featured Restaurants ("Restaurants Worth Discovering") */}
            <FeaturedRestaurants
              restaurants={MOCK_RESTAURANTS}
              savedIds={savedRestaurantIds}
              onToggleFavorite={handleToggleFavoriteRestaurant}
              onSelectRestaurant={(r) => setSelectedRestaurant(r)}
              onQuickReserve={(r, e) => {
                e.stopPropagation();
                handleOpenReservation(r);
              }}
            />

            {/* 7. Chef Signatures ("Culinary Highlights") */}
            <ChefSignatures
              savedDishIds={savedDishIds}
              onToggleSaveDish={handleToggleFavoriteDish}
              onAddToCart={handleAddToCart}
            />

            {/* 8. Customer Testimonials ("What Diners Say") */}
            <TestimonialsSection />

            {/* 9. Dining Categories (5 Occasion Tiles) */}
            <DiningCategories
              onSelectCategory={(action) => {
                if (action.type === 'tab') {
                  setActiveTab(action.value as ActiveTab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />

            {/* 10. Live Order Tracker Section */}
            <OrderTrackerSection
              currentOrder={orders[0]}
              onViewAllOrders={() => {
                setActiveTab('orders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 11. Exclusive Offers Section */}
            <OffersSection
              onSelectRestaurantById={handleSelectRestaurantById}
              onShowToast={showToast}
            />

            {/* 12. Stories From The Table (Editorial Food Articles) */}
            <StoriesSection onSelectArticle={(art) => setSelectedArticle(art)} />

            {/* 13. Newsletter Subscription */}
            <NewsletterSection />
          </>
        )}

        {/* Dedicated Page View: Explore / Restaurants */}
        {(activeTab === 'explore' || activeTab === 'restaurants') && (
          <ExploreView
            restaurants={MOCK_RESTAURANTS}
            savedIds={savedRestaurantIds}
            onToggleFavorite={handleToggleFavoriteRestaurant}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
            onQuickReserve={(r, e) => {
              e.stopPropagation();
              handleOpenReservation(r);
            }}
            initialCuisine={selectedCuisine}
            initialSearch={searchQuery}
          />
        )}

        {/* Dedicated Page View: Curated Experiences */}
        {activeTab === 'experiences' && (
          <div className="py-8 sm:py-12 bg-[#F7F1E5]">
            <CollectionsSection
              onSelectCollection={(colId) => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewAllCollections={() => {}}
            />
            <FeaturedRestaurants
              restaurants={MOCK_RESTAURANTS}
              savedIds={savedRestaurantIds}
              onToggleFavorite={handleToggleFavoriteRestaurant}
              onSelectRestaurant={(r) => setSelectedRestaurant(r)}
              onQuickReserve={(r, e) => {
                e.stopPropagation();
                handleOpenReservation(r);
              }}
            />
          </div>
        )}

        {/* Dedicated Page View: Orders & Live Tracking */}
        {activeTab === 'orders' && (
          <OrdersView
            orders={orders}
            reservations={reservations}
            onReorder={(order) => {
              showToast(`Re-ordered courses from ${order.restaurantName}`);
            }}
            onCancelReservation={handleCancelReservation}
            onExploreClick={() => setActiveTab('explore')}
          />
        )}

        {/* Dedicated Page View: Saved Places & Dishes */}
        {activeTab === 'saved' && (
          <SavedView
            savedRestaurantIds={savedRestaurantIds}
            savedDishIds={savedDishIds}
            allRestaurants={MOCK_RESTAURANTS}
            allDishes={CHEF_SIGNATURE_DISHES}
            allCollections={RESTAURANT_COLLECTIONS}
            onToggleFavorite={handleToggleFavoriteRestaurant}
            onToggleSaveDish={handleToggleFavoriteDish}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
            onQuickReserve={(r, e) => {
              e.stopPropagation();
              handleOpenReservation(r);
            }}
            onAddToCart={handleAddToCart}
            onExploreClick={() => setActiveTab('explore')}
          />
        )}

        {/* Dedicated Page View: Account & Dining Preferences */}
        {activeTab === 'account' && (
          <AccountView
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {/* Dedicated Page View: Offers */}
        {activeTab === 'offers' && (
          <div className="py-8 bg-[#F7F1E5]">
            <OffersSection
              onSelectRestaurantById={handleSelectRestaurantById}
              onShowToast={showToast}
            />
          </div>
        )}

        {/* Dedicated Page View: Articles & Editorial Stories */}
        {activeTab === 'articles' && (
          <div className="py-8 bg-[#F7F1E5]">
            <StoriesSection onSelectArticle={(art) => setSelectedArticle(art)} />
          </div>
        )}

        {/* Dedicated Page View: Contact Concierge & Partnerships */}
        {activeTab === 'contact' && <ContactSection onShowToast={showToast} />}
      </main>

      {/* Luxury Dark Navy Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedRestaurantIds.length}
        ordersCount={orders.length}
      />

      {/* Modals & Drawers */}
      {/* 1. Restaurant Detail Modal */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          isSaved={savedRestaurantIds.includes(selectedRestaurant.id)}
          onToggleSave={handleToggleFavoriteRestaurant}
          onAddToCart={handleAddToCart}
          onBookReservation={(r) => {
            setSelectedRestaurant(null);
            handleOpenReservation(r);
          }}
        />
      )}

      {/* 2. Table Reservation Modal */}
      {isReservationModalOpen && (
        <ReservationModal
          restaurant={reservationTargetRestaurant}
          allRestaurants={MOCK_RESTAURANTS}
          onClose={() => setIsReservationModalOpen(false)}
          onConfirmReservation={handleConfirmReservation}
        />
      )}

      {/* 3. Food Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* 4. Brand Story Video Modal */}
      {isStoryModalOpen && (
        <StoryVideoModal onClose={() => setIsStoryModalOpen(false)} />
      )}

      {/* 5. Cart Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={() => setCartItems([])}
        onCheckout={handleCheckout}
      />

      {/* 6. Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
