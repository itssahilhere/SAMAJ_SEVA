# 🔍 SAMAJ SEWAK - Search Functionality Test Guide

## 🚀 **Quick Search Test Steps**

### **1. Basic Search Test**

1. **Open your website** in the browser
2. **Look for the search bar** in the header (top right area)
3. **Type a search term** like "India" or "cricket"
4. **Press Enter** or click the search icon
5. **Check the browser console** (F12 > Console tab) for debug messages

### **2. Debug Messages to Look For**

When you search, you should see these console messages:

```
Header search triggered with: [your search term]
Search triggered with query: [your search term]
Search response: [API response object]
```

### **3. Expected Behavior**

- ✅ **Search bar appears** in header
- ✅ **Can type in search bar**
- ✅ **Enter key triggers search**
- ✅ **Loading state shows** (skeleton or spinner)
- ✅ **Results display** filtered news articles
- ✅ **Console shows debug messages**

### **4. Test Search Terms**

Try these search terms:

```
✅ Working Terms:
- "India" - Should show India-related news
- "cricket" - Should show sports news
- "politics" - Should show political news
- "technology" - Should show tech news
- "delhi" - Should show Delhi news
```

### **5. Troubleshooting Steps**

#### **If Search Bar is Missing:**

- Check if Header component is rendering
- Verify the search form is in the header
- Check for JavaScript errors in console

#### **If Search Doesn't Trigger:**

- Check browser console for errors
- Verify the form submission is working
- Check if onSearch function is being called

#### **If No Results Show:**

- Check API key is valid
- Check network requests in DevTools > Network tab
- Look for API errors in console
- Verify search response in console

#### **If Search is Slow:**

- Check network connection
- Check API rate limits
- Look for API response times in Network tab

### **6. Advanced Debugging**

#### **Check Network Requests:**

1. Open DevTools (F12)
2. Go to Network tab
3. Perform a search
4. Look for requests to `newsdata.io`
5. Check request parameters:
   - `q`: your search term
   - `apikey`: your API key
   - `country`: "in"
   - `language`: "en"

#### **Check API Response:**

- Look for 200 status code
- Check if `results` array has articles
- Verify article structure

### **7. Common Issues & Solutions**

#### **Issue: "Search triggered" but no results**

**Solution:** Check API key and network connection

#### **Issue: No console messages**

**Solution:** Check if search form is working, verify event handlers

#### **Issue: API errors in console**

**Solution:** Check API key validity and rate limits

#### **Issue: Search works but shows wrong results**

**Solution:** Check search query formatting and API parameters

### **8. Mobile Search Test**

- **Test on mobile device** or browser mobile view
- **Verify search bar is touch-friendly**
- **Check if search works on mobile**
- **Test keyboard behavior**

### **9. Performance Test**

- **Search multiple times quickly**
- **Check for rate limiting**
- **Monitor loading times**
- **Test with different search terms**

### **10. Error Handling Test**

- **Search with empty string**
- **Search with special characters**
- **Search with very long text**
- **Test offline behavior**

---

## 🎯 **Quick Fix Checklist**

If search is not working, check these:

- [ ] **API Key**: Is `VITE_NEWSDATA_API_KEY` set in environment?
- [ ] **Console Errors**: Any JavaScript errors in browser console?
- [ ] **Network Requests**: Are API calls being made?
- [ ] **Search Form**: Is the form element present and functional?
- [ ] **Event Handlers**: Are click/enter events working?
- [ ] **API Response**: Is the API returning data?

---

## 🚀 **Expected Search Flow**

1. **User types** in search bar
2. **User presses Enter** or clicks search
3. **Console shows**: "Header search triggered with: [query]"
4. **Console shows**: "Search triggered with query: [query]"
5. **Loading state** appears
6. **API request** is made to NewsData.io
7. **Console shows**: "Search response: [response]"
8. **Results display** with filtered articles
9. **Loading state** disappears

---

**If you see all these steps working, your search is functioning correctly!** 🎉

**If any step fails, check the troubleshooting section above.**
