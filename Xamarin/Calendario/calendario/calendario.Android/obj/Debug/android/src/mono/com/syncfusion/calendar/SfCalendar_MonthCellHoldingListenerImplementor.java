package mono.com.syncfusion.calendar;


public class SfCalendar_MonthCellHoldingListenerImplementor
	extends java.lang.Object
	implements
		mono.android.IGCUserPeer,
		com.syncfusion.calendar.SfCalendar.MonthCellHoldingListener
{
/** @hide */
	public static final String __md_methods;
	static {
		__md_methods = 
			"n_onMonthCellHolding:(Ljava/lang/Object;Ljava/util/Calendar;)V:GetOnMonthCellHolding_Ljava_lang_Object_Ljava_util_Calendar_Handler:Com.Syncfusion.Calendar.SfCalendar/IMonthCellHoldingListenerInvoker, Syncfusion.SfCalendar.Android\n" +
			"";
		mono.android.Runtime.register ("Com.Syncfusion.Calendar.SfCalendar+IMonthCellHoldingListenerImplementor, Syncfusion.SfCalendar.Android, Version=15.4451.0.17, Culture=neutral, PublicKeyToken=3d67ed1f87d44c89", SfCalendar_MonthCellHoldingListenerImplementor.class, __md_methods);
	}


	public SfCalendar_MonthCellHoldingListenerImplementor () throws java.lang.Throwable
	{
		super ();
		if (getClass () == SfCalendar_MonthCellHoldingListenerImplementor.class)
			mono.android.TypeManager.Activate ("Com.Syncfusion.Calendar.SfCalendar+IMonthCellHoldingListenerImplementor, Syncfusion.SfCalendar.Android, Version=15.4451.0.17, Culture=neutral, PublicKeyToken=3d67ed1f87d44c89", "", this, new java.lang.Object[] {  });
	}


	public void onMonthCellHolding (java.lang.Object p0, java.util.Calendar p1)
	{
		n_onMonthCellHolding (p0, p1);
	}

	private native void n_onMonthCellHolding (java.lang.Object p0, java.util.Calendar p1);

	private java.util.ArrayList refList;
	public void monodroidAddReference (java.lang.Object obj)
	{
		if (refList == null)
			refList = new java.util.ArrayList ();
		refList.add (obj);
	}

	public void monodroidClearReferences ()
	{
		if (refList != null)
			refList.clear ();
	}
}
