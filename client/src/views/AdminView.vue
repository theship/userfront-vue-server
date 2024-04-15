<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const adminDetails = ref({});

async function fetchAdminDetails() {
    // Retrieve the access token from a proper source
    const accessToken = Userfront.tokens.accessToken;

    // Dispatch the action with the  access token
    await store.dispatch('fetchAdminStatus', accessToken);

    if (!store.state.isAdmin) {
        console.error("Access denied. No access.");
        return;
    }

    try {
        const response = await fetch("/admin-endpoint", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Userfront.tokens.accessToken}`,
            },
        });

        // Log the content type of the response
        const contentType = response.headers.get('content-type');
        console.log('Response Content-Type:', contentType);

        if (!response.ok) {
            throw new Error(`Failed to fetch access details: ${response.statusText}`);
        }
        
        // Parse and log the response
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Response Data:', data);  // Log the JSON data
            adminDetails.value = data;
            console.log('adminDetails.value:', adminDetails.value);  // Log the admin details
        } else {
            console.log('Response received is not JSON:', await response.text());  // Log non-JSON response for debugging
        }
    } catch (error) {
        console.error("Error fetching access details:", error);
    }
}


onMounted(fetchAdminDetails);
</script>


<template>
    <div class="admin-panel" v-if="adminDetails">
        <h1>Admin Panel</h1>
        <p>Welcome to the admin panel.</p>
        <div>
            <h2>Admin Details</h2>
            <p>Your Org Tenant ID: {{ adminDetails.tenantId }}</p>
            <p v-if="adminDetails.roles">Your Roles: {{ adminDetails.roles.join(', ') }}</p>
        </div>
    </div>
</template>

